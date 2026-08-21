// This script checks for planes arriving at MOD and lines them up behind one another.
// Each plane continues flying until the final plane reaches MOD
// NOTE: This differs from the original logic of the sim where the level only scores when the last plane reaches MOD
// The level can still be completed, but only ideal if they line up exactly at the same time. If any plane stops, then it's not perfect.
import { useEffect, useRef } from "react";
import { tracks, resolvePixel } from "./SimConfig.jsx";

const MOD_WAYPOINT = "0_MOD";

// Three ticks between each aircraft lining up at finish
const PREFERRED_SLOT_PX = 52.08;

export const finishSlotPixel = (modPixel, planeCount, slotsAhead) => {
    if (slotsAhead <= 0) return modPixel;
    const spacing = Math.min(PREFERRED_SLOT_PX, modPixel / (planeCount - 1));
    return modPixel - slotsAhead * spacing;
};

const ARRIVAL_TOLERANCE_PX = 0.5;

const pixelOf = (trackKey, waypoint) =>
    resolvePixel(tracks[trackKey]?.SvgComponent?.breakpoints, waypoint);

// A plane is at rest once it has reached the pixel it was told to stop on
const allPlanesAtRest = (activePlanes, positions, restPixels) =>
    activePlanes.every((planeKey) => {
        const position = positions[planeKey];
        const restPixel = restPixels[planeKey];
        if (!position || typeof restPixel !== "number") return false;
        return position.pixel <= restPixel + ARRIVAL_TOLERANCE_PX;
    });

// extendPlaneTo(planeKey, waypointName) is from useTrackSwitching
// onAllPlanesFinished is called once, when every plane has stopped moving
export const useFinishTracking = ({
    activePlanes,
    getPlanePositions,
    extendPlaneTo,
    getElapsedSeconds,
    onAllPlanesFinished
}) => {
    const arrivedRef = useRef(new Set());

    // clock stops when last plane reaches MOD
    const scoreTimeRef = useRef(null);
    const restPixelsRef = useRef({});
    const finishedRef = useRef(false);

    const getPositionsRef = useRef(getPlanePositions);
    getPositionsRef.current = getPlanePositions;
    const extendRef = useRef(extendPlaneTo);
    extendRef.current = extendPlaneTo;
    const onAllRef = useRef(onAllPlanesFinished);
    onAllRef.current = onAllPlanesFinished;
    const getElapsedRef = useRef(getElapsedSeconds);
    getElapsedRef.current = getElapsedSeconds;

    // arrival order whenever the level or active planes changes
    useEffect(() => {
        arrivedRef.current = new Set();
        restPixelsRef.current = {};
        finishedRef.current = false;
        scoreTimeRef.current = null;
    }, [activePlanes]);

    useEffect(() => {
        let rafId;
        const tick = () => {
            if (!finishedRef.current) {
                const positions = getPositionsRef.current();

                activePlanes.forEach((planeKey) => {
                    if (arrivedRef.current.has(planeKey)) return;

                    const position = positions[planeKey];
                    if (!position) return;

                    const modPixel = pixelOf(position.trackKey, MOD_WAYPOINT);

                    // Planes fly toward MOD from a higher pixel, so arriving means dropping to it
                    if (position.pixel > modPixel + ARRIVAL_TOLERANCE_PX) return;

                    arrivedRef.current.add(planeKey);

                    // One slot for every plane still inbound behind this one
                    const remaining = activePlanes.length - arrivedRef.current.size;
                    const restPixel = finishSlotPixel(modPixel, activePlanes.length, remaining);

                    restPixelsRef.current[planeKey] = restPixel;

                    // extendPlaneTo runs it through resolvePixel passing numbers straight through so the computed pixel needs no waypoint name
                    if (remaining > 0) extendRef.current(planeKey, restPixel);
                });

                // Held open until the planes still going out to their slots so the level is not called finished with planes still moving
                const everyPlaneArrived =
                    activePlanes.length > 0 && arrivedRef.current.size === activePlanes.length;

                // Stamp the score the moment the lineup is complete then let the aircraft settle
                if (everyPlaneArrived && scoreTimeRef.current === null) {
                    scoreTimeRef.current = getElapsedRef.current ? getElapsedRef.current() : null;
                }

                if (everyPlaneArrived && allPlanesAtRest(activePlanes, positions, restPixelsRef.current)) {
                    finishedRef.current = true;
                    onAllRef.current(scoreTimeRef.current);
                }
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [activePlanes]);

    // Clears arrival order (used when a level is reset or restarted)
    const resetFinishTracking = () => {
        arrivedRef.current = new Set();
        restPixelsRef.current = {};
        finishedRef.current = false;
        scoreTimeRef.current = null;
    };

    return { resetFinishTracking };
};
