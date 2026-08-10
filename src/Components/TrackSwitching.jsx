import { useRef, useState } from "react";
import gsap from "gsap";
import { tracks, startingConditions, resolvePixel, DEFAULT_SPEED } from "./SimConfig";

// Max pixels two positions can differ and still count as same point
export const CONTINUITY_TOLERANCE = 2;

// Breakpoints that are present on both tracks (i.e. Prior to switch)
export const sharedWaypoints = (fromBreakpoints, toBreakpoints) => {
    if (!fromBreakpoints || !toBreakpoints) return [];
    const shared = Object.keys(fromBreakpoints).filter(
        (name) => typeof toBreakpoints[name] === "number"
    );
    shared.sort((a, b) => fromBreakpoints[a] - fromBreakpoints[b]);
    return shared.length >= 2 ? shared : [];
};

// Convert px position on one track to px position on another, interpolating between shared waypoints
export const remapPixelBetweenTracks = (fromBreakpoints, toBreakpoints, pixel) => {
    const names = sharedWaypoints(fromBreakpoints, toBreakpoints);
    if (!names.length) return null;

    const first = names[0];
    const last = names[names.length - 1];

    if (pixel <= fromBreakpoints[first]) {
        return toBreakpoints[first] + (pixel - fromBreakpoints[first]);
    }
    if (pixel >= fromBreakpoints[last]) {
        return toBreakpoints[last] + (pixel - fromBreakpoints[last]);
    }

    for (let i = 0; i < names.length - 1; i += 1) {
        const lo = names[i];
        const hi = names[i + 1];
        const fromLo = fromBreakpoints[lo];
        const fromHi = fromBreakpoints[hi];

        if (pixel >= fromLo && pixel <= fromHi) {
            const span = fromHi - fromLo;
            const t = span === 0 ? 0 : (pixel - fromLo) / span;
            return toBreakpoints[lo] + t * (toBreakpoints[hi] - toBreakpoints[lo]);
        }
    }
    return null;
};

// (x, y) at px pos on a path
export const pointAtPixel = (pathElement, pixel) => {
    if (!pathElement) return null;
    const total = pathElement.getTotalLength();
    return pathElement.getPointAtLength(Math.max(0, Math.min(pixel, total)));
};

// Determine if plane is able to switch
export const measureSwitchGap = (fromPathElement, fromPixel, toPathElement, toPixel) => {
    const a = pointAtPixel(fromPathElement, fromPixel);
    const b = pointAtPixel(toPathElement, toPixel);

    if (!a || !b) return { ok: false, gap: Infinity };

    const gap = Math.hypot(a.x - b.x, a.y - b.y);
    return { ok: gap <= CONTINUITY_TOLERANCE, gap };
};

// Next item in switchable list
export const nextTrackKey = (planeKey, currentTrackKey) => {
    const config = startingConditions[planeKey];
    const candidates = config?.switchableTracks || [];
    if (candidates.length < 2) return null;

    const index = candidates.indexOf(currentTrackKey);
    return candidates[(index + 1) % candidates.length];
};

// Breakpoint map for track key
const breakpointsFor = (trackKey) => tracks[trackKey]?.SvgComponent?.breakpoints || {};

// Runtime registry and hook


// activePlanes - keys currently in sim
// timelineRef - master timeline
// pathRefs -  pathRefs.current[planeKey][trackKey] -> <path> element

// Actually switches the track
export const useTrackSwitching = ({ activePlanes, timelineRef, pathRefs }) => {
    const [planeTracks, setPlaneTracks] = useState(() => {
        const initial = {};
        Object.keys(startingConditions).forEach((planeKey) => {
            initial[planeKey] = startingConditions[planeKey].trackKey;
        });
        return initial;
    });

    const planeTracksRef = useRef(planeTracks);
    const runtimeRef = useRef({});
    const trailVisibleRef = useRef({});
    const [trailVisible, setTrailVisible] = useState({});
    const [switchNotice, setSwitchNotice] = useState(null);

    const setPlaneTrack = (planeKey, trackKey) => {
        planeTracksRef.current = { ...planeTracksRef.current, [planeKey]: trackKey };
        setPlaneTracks(planeTracksRef.current);
    };

    // Every track that can be flying a plane
    const candidateTracks = (planeKey) => {
        const config = startingConditions[planeKey];
        if (!config) return [];
        return config.switchableTracks?.length ? config.switchableTracks : [config.trackKey];
    };


    // Build a sub-timeline with motionPath tween and trail draw anchored locally so it overides config start ontop of plane
    const buildPlaneSub = (planeKey, trackKey, fromPixel) => {
        const config = startingConditions[planeKey];
        const pathElement = pathRefs.current[planeKey]?.[trackKey];
        if (!config || !pathElement) return null;

        const breakpoints = breakpointsFor(trackKey);
        const totalLength = pathElement.getTotalLength();

        const startPixel =
            typeof fromPixel === "number" ? fromPixel : resolvePixel(breakpoints, config.startPixel);
        const endPixel = resolvePixel(breakpoints, config.endPixel);

        const speed = config.speed || DEFAULT_SPEED;
        const duration = Math.abs(endPixel - startPixel) / speed;

        const startProgress = startPixel / totalLength;
        const endProgress = endPixel / totalLength;

        // Trail starts drawn up to the plane, then extends as it flies.
        gsap.set(pathElement, {
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength * (1 - startProgress),
            opacity: trailVisibleRef.current[planeKey] ? 1 : 0
        });

        const sub = gsap.timeline({ id: planeKey });

        sub.to(
            config.planeId,
            {
                motionPath: {
                    path: pathElement,
                    align: pathElement,
                    alignOrigin: config.alignOrigin,
                    autoRotate: config.autoRotate,
                    start: startProgress,
                    end: endProgress
                },
                duration,
                ease: config.ease
            },
            0
        );

        const motionTween = sub.recent();

        sub.to(
            pathElement,
            {
                strokeDashoffset: totalLength * (1 - endProgress),
                duration,
                ease: config.ease
            },
            0
        );

        runtimeRef.current[planeKey] = {
            trackKey,
            pathElement,
            sub,
            motionTween,
            startPixel,
            endPixel,
            totalLength
        };

        return sub;
    };

    // Hide all possible paths so only active shows
    const hideCandidatePaths = (planeKey) => {
        candidateTracks(planeKey).forEach((trackKey) => {
            const element = pathRefs.current[planeKey]?.[trackKey];
            if (element) gsap.set(element, { opacity: 0 });
        });
    };

    // Rebuild master timeline
    const buildAll = () => {
        if (timelineRef.current) timelineRef.current.kill();
        timelineRef.current = gsap.timeline({ paused: true });
        runtimeRef.current = {};

        activePlanes.forEach((planeKey) => {
            hideCandidatePaths(planeKey);

            const trackKey = planeTracksRef.current[planeKey] || startingConditions[planeKey]?.trackKey;
            const sub = buildPlaneSub(planeKey, trackKey);
            if (sub) timelineRef.current.add(sub, 0);
        });

        timelineRef.current.progress(0.0001);
        return timelineRef.current;
    };

    // current px pos of plane along own track
    const currentPixelOf = (planeKey) => {
        const runtime = runtimeRef.current[planeKey];
        if (!runtime) return null;

        const ratio =
            typeof runtime.motionTween?.ratio === "number"
                ? runtime.motionTween.ratio
                : runtime.sub?.progress() || 0;

        return runtime.startPixel + (runtime.endPixel - runtime.startPixel) * ratio;
    };

    //Get live position of every plane in svg coord used in separation and collision
    const getPlanePositions = () => {
        const positions = {};

        activePlanes.forEach((planeKey) => {
            const runtime = runtimeRef.current[planeKey];
            if (!runtime) return;

            const pixel = currentPixelOf(planeKey);
            const point = pointAtPixel(runtime.pathElement, pixel);
            if (!point) return;

            positions[planeKey] = {
                trackKey: runtime.trackKey,
                pixel,
                x: point.x,
                y: point.y
            };
        });

        return positions;
    };

    // Move plane onto switched track keeping everything same
    const switchTrack = (planeKey) => {
        const refuse = (reason) => {
            const result = { ok: false, reason };
            setSwitchNotice({ planeKey, ...result });
            return result;
        };

        const master = timelineRef.current;
        const runtime = runtimeRef.current[planeKey];

        if (!planeKey || !startingConditions[planeKey]) return refuse("No plane selected");
        if (!master || !runtime) return refuse("Plane is not airborne yet");

        const fromTrackKey = runtime.trackKey;
        const toTrackKey = nextTrackKey(planeKey, fromTrackKey);
        if (!toTrackKey) return refuse("No alternate track configured");

        const toPathElement = pathRefs.current[planeKey]?.[toTrackKey];
        if (!toPathElement) return refuse("Destination track is not mounted");

        const fromPixel = currentPixelOf(planeKey);
        const toPixel = remapPixelBetweenTracks(
            breakpointsFor(fromTrackKey),
            breakpointsFor(toTrackKey),
            fromPixel
        );
        if (toPixel === null) return refuse("Tracks share no common waypoints");

        const { ok, gap } = measureSwitchGap(runtime.pathElement, fromPixel, toPathElement, toPixel);
        if (!ok) {
            const result = {
                ok: false,
                from: fromTrackKey,
                to: toTrackKey,
                gap,
                reason: `Tracks have already diverged (${gap.toFixed(0)}px apart)`
            };
            setSwitchNotice({ planeKey, ...result });
            return result;
        }
        // Splice into master timeline
        const masterTime = master.time();
        const planeTimeScale = runtime.sub.timeScale();

        runtime.sub.kill();
        gsap.set(runtime.pathElement, { opacity: 0 });

        const nextSub = buildPlaneSub(planeKey, toTrackKey, toPixel);
        if (!nextSub) {
            const restored = buildPlaneSub(planeKey, fromTrackKey, fromPixel);
            if (restored) {
                master.add(restored, masterTime);
                restored.timeScale(planeTimeScale);
            }
            return refuse("Could not build the new track leg");
        }

        master.add(nextSub, masterTime);
        nextSub.timeScale(planeTimeScale);

        // force render so paused timeline shows plane on new track
        master.render(masterTime, true, true);

        setPlaneTrack(planeKey, toTrackKey);

        const result = { ok: true, from: fromTrackKey, to: toTrackKey, gap };
        setSwitchNotice({ planeKey, ...result });
        return result;
    };

    // Show Trails
    const showTrail = (planeKey) => {
        const runtime = runtimeRef.current[planeKey];
        if (!runtime) return;

        trailVisibleRef.current[planeKey] = true;
        setTrailVisible({ ...trailVisibleRef.current });
        gsap.set(runtime.pathElement, { opacity: 1 });
    };

    // Hide Trails
    const hideTrail = (planeKey) => {
        const runtime = runtimeRef.current[planeKey];
        trailVisibleRef.current[planeKey] = false;
        setTrailVisible({ ...trailVisibleRef.current });
        if (runtime) gsap.set(runtime.pathElement, { opacity: 0 });
    };

    const hideAllTrails = () => {
        activePlanes.forEach(hideTrail);
    };

    return {
        // state for the view
        planeTracks,
        trailVisible,
        switchNotice,
        clearSwitchNotice: () => setSwitchNotice(null),

        // timeline lifecycle
        buildAll,

        // actions
        switchTrack,
        showTrail,
        hideTrail,
        hideAllTrails,

        // helpers the view and future systems need
        candidateTracks,
        nextTrackFor: (planeKey) => nextTrackKey(planeKey, planeTracksRef.current[planeKey]),
        currentPixelOf,
        getPlanePositions
    };
};
