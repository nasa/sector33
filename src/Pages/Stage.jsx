// This script is the main housing for the levels and combines everything onto this page

import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import { globalAnimations } from "../Components/globalAnimations.jsx";
import { DiamondIconSVG } from "../../assets/resources/IconSVGs.jsx";
import { ReturnToMenuBtn, ReturnToLevelsBtn, IntroBanner, StageLevelLabel, ProximityWarning, LevelCompleteModal, StormOverlay, PlaneMarkerOverlay, HdsButton, HdsIconButton } from "../Components/UIComponents.jsx";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);
import {SVGComponent0, SVGComponentTest} from '../../assets/resources/PathSVGs.jsx';
import {
    tracks,
    cycleTimelineSpeed,
    resetTimelineSpeed,
    DEFAULT_PLANE_COLOR,
    readableTextOn
} from "../Components/SimConfig";
import { useTrackSwitching } from "../Components/TrackSwitching";
import { getLevelConfig, getNextLevelId, activePlanesFor, blockedTracksFor } from "../Components/LevelConfig.jsx";
import { useCollisionTracking } from "../Components/collisionTracking.jsx";
import { useFinishTracking } from "../Components/FinishTracking.jsx";
import { evaluateScore, SCORE_TIER } from "../Components/ScoreConfig.jsx";
import { playSound } from "../Components/soundEffects.jsx";

// One sound per level outcome
const SCORE_SOUNDS = {
    [SCORE_TIER.PERFECT]: "successBestTime",
    [SCORE_TIER.SUCCESS]: "successNotBestTime",
    [SCORE_TIER.FAILURE]: "fail"
};

const SKIP_SECONDS = 30;
const SKIP_TIME_SCALE = 10;
const TRANSPORT_SIZE = "7.5cqmin";

const Stage = ({ onNavigate, levelId }) => {

    // Global Animations
    const { animateIn, animateOut, introBannerSlideInOut } = globalAnimations();

    const levelConfig = getLevelConfig(levelId);

    // References to DOM elements
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    // Whether the sim is running, so the readout below only ticks while it is
    const isPlayingRef = useRef(false);
    const skipCallRef = useRef(null);
    const skipPreviousScaleRef = useRef(1);
    const pathRefs = useRef({});
    const activePlanes = useMemo(() => activePlanesFor(levelConfig), [levelConfig]);
    const blockedTracks = useMemo(() => blockedTracksFor(levelConfig), [levelConfig]);

    // React state hooks for layout changes
    const [currentSpeedLabel, setCurrentSpeedLabel] = useState(1);
    const [activePlane, setActivePlane] = useState(null);
    const [planeCurrentSpeeds, setPlaneCurrentSpeeds] = useState({});
    const [score, setScore] = useState(null);
    const [displayElapsedSeconds, setDisplayElapsedSeconds] = useState(0);
    const [skipping, setSkipping] = useState(false);

    // All track ownership, trail visibility and switching lives here.
    const {
        planeTracks,
        trailVisible,
        switchNotice,
        clearSwitchNotice,
        buildAll,
        switchTrack,
        showTrail,
        hideAllTrails,
        candidateTracks,
        nextTrackFor,
        getPlanePositions,
        extendPlaneTo,
        rebuildPlanePaths
    } = useTrackSwitching({ activePlanes, timelineRef, pathRefs, startingConditions: levelConfig.startingConditions });

    // Warns when any two planes cross the level's separation distance, and keeps a sticky flag for scoring once separation has ever been lost.
    const { tooClose, everTooCloseRef, resetCollisionState } = useCollisionTracking({
        activePlanes,
        getPlanePositions,
        separationPx: levelConfig.separationPx
    });

    // Clear the previous run's score and timer whenever a different level is selected.
    useEffect(() => {
        isPlayingRef.current = false;
        setDisplayElapsedSeconds(0);
        setScore(null);
        resetCollisionState();
    }, [levelId]);

    // Never leave a pending skip running against a timeline that has gone away
    useEffect(() => () => {
        if (skipCallRef.current) skipCallRef.current.kill();
    }, []);

    // Drives the elapsed time readout by the controls
    useEffect(() => {
        let rafId;
        const tick = () => {
            if (isPlayingRef.current && timelineRef.current) {
                setDisplayElapsedSeconds(timelineRef.current.time());
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // Scores the run once every plane has come to rest
    const handleLevelComplete = (scoreTime) => {
        isPlayingRef.current = false;
        // A skip may still be counting down when the last plane lands
        cancelSkip();

        const elapsedSeconds = typeof scoreTime === "number"
            ? scoreTime
            : (timelineRef.current ? timelineRef.current.time() : 0);

        // Every plane has stopped on its slot by the time this fires, so the sim can be frozen without cutting a plane short of the lineup
        if (timelineRef.current) {
            setDisplayElapsedSeconds(elapsedSeconds);
            timelineRef.current.pause();
        }

        setScore(evaluateScore({
            completed: true,
            everTooClose: everTooCloseRef.current,
            elapsedSeconds,
            idealTimeSeconds: levelConfig.idealTimeSeconds
        }));
    };

    // Lines planes up past MOD as they arrive, and ends the level once they have all stopped.
    const { resetFinishTracking } = useFinishTracking({
        activePlanes,
        getPlanePositions,
        extendPlaneTo,
        getElapsedSeconds: () => (timelineRef.current ? timelineRef.current.time() : 0),
        onAllPlanesFinished: handleLevelComplete
    });

    const { contextSafe } = useGSAP(() => {
        //On load animations
        introBannerSlideInOut();
        // Timed to land as the intro banner slides back off, so the level stays named
        gsap.fromTo('.levelLabel', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 6.2 });
        animateIn();
        gsap.to('.speedControls', { autoAlpha: 0, duration:0});

        buildAll();
    }, { scope: containerRef, dependencies: [activePlanes] });

    // Watched rather than called inline so the observer below always runs the current one
    const rebuildPlanePathsRef = useRef(rebuildPlanePaths);
    rebuildPlanePathsRef.current = rebuildPlanePaths;

    // Rebuild the motion paths whenever the canvas changes size, otherwise the planes keep flying the pixel coordinates baked in at the previous size and drift off track.
    useEffect(() => {
        const element = containerRef.current;
        if (!element || typeof ResizeObserver === "undefined") return undefined;

        let frame;
        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => rebuildPlanePathsRef.current());
        });

        observer.observe(element);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, []);

    // Sound the alert as separation is lost, not on every frame it stays lost
    useEffect(() => {
        if (tooClose) playSound("planesTooClose");
    }, [tooClose]);

    // One outcome sound when the level is graded
    useEffect(() => {
        if (score) playSound(SCORE_SOUNDS[score.tier]);
    }, [score]);

    // Let a switch message fade out on its own rather than sticking around.
    useEffect(() => {
        if (!switchNotice) return undefined;
        const timer = setTimeout(clearSwitchNotice, 3000);
        return () => clearTimeout(timer);
    }, [switchNotice]);


    // Page Leave Animations
    const menuPressed = () => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    };

    const levelSelectPressed = () => {
        animateOut(() => onNavigate('Levels'), '.fade-out');
    };

    const nextLevelId = getNextLevelId(levelConfig.id);

    // Level complete popup actions
    const nextLevelPressed = () => { playSound("nextPrev"); return onNavigate('Stage', nextLevelId); };
    const restartLevelPressed = () => resetPressed();

    // Control Buttons (Standard syntax)
    const playPressed = contextSafe(function() {
        playSound("play");
        if (timelineRef.current) {
            isPlayingRef.current = true;
            timelineRef.current.play();
        }
    });

    const pausePressed = contextSafe(function() {
        playSound("pause");
        if (timelineRef.current) {
            isPlayingRef.current = false;
            timelineRef.current.pause();
            setDisplayElapsedSeconds(timelineRef.current.time());
        }
    });

    // Reset rebuilds rather than restarts
    const resetPressed = contextSafe(function() {
        playSound("restart");
        cancelSkip();
        buildAll();
        timelineRef.current.pause();
        setPlaneCurrentSpeeds({});
        setCurrentSpeedLabel(resetTimelineSpeed(timelineRef.current));

        isPlayingRef.current = false;
        setDisplayElapsedSeconds(0);
        setScore(null);
        setActivePlane(null);
        hideEverything();
        resetCollisionState();
        resetFinishTracking();
    });

    const speedPressed = contextSafe(function() {
        playSound("speedChange");
        if (timelineRef.current) {
            const activeSpeed = cycleTimelineSpeed(timelineRef.current);
            setCurrentSpeedLabel(activeSpeed);
        }
    });

    // Clears a skip that is still running
    const cancelSkip = () => {
        if (!skipCallRef.current) return;
        skipCallRef.current.kill();
        skipCallRef.current = null;
        if (timelineRef.current) timelineRef.current.timeScale(skipPreviousScaleRef.current);
        setSkipping(false);
    };

    // Runs the sim forward by exactly SKIP_SECONDS
    const skipPressed = contextSafe(function() {
        const master = timelineRef.current;
        if (!master || skipping || score) return;

        playSound("skip30");
        const previousTimeScale = master.timeScale();
        const targetTime = Math.min(master.time() + SKIP_SECONDS, master.duration());

        skipPreviousScaleRef.current = previousTimeScale;
        setSkipping(true);
        isPlayingRef.current = true;
        master.timeScale(SKIP_TIME_SCALE);
        master.play();

        skipCallRef.current = gsap.delayedCall(SKIP_SECONDS / SKIP_TIME_SCALE, () => {
            master.pause();
            master.time(targetTime);
            master.timeScale(previousTimeScale);

            isPlayingRef.current = false;
            setDisplayElapsedSeconds(master.time());
            skipCallRef.current = null;
            setSkipping(false);
        });
    });


    // Show/Hide Plane Trails
    const hideEverything = contextSafe(() => {
        hideAllTrails();
        gsap.to('.speedControls', { autoAlpha: 0, duration:0.25, ease:'easeOut' });
    });


    // Selecting an aircraft
    const selectPlane = contextSafe((planeKey) => {
        if (trailVisible[planeKey]) return;
        playSound("selectPlane");
        // hide all other trails, then reveal this one's
        hideAllTrails();
        showTrail(planeKey);
        displaySpeedControls();
        setActivePlane(planeKey);
    });

    const handlePlaneClick = contextSafe((e, planeKey) => {
        e.stopPropagation();
        // If same plane clicked do nothing
        selectPlane(planeKey);
    });

    // Show/Hide Speed Controls per plane
    const displaySpeedControls = contextSafe(() => {
        gsap.to('.speedControls', { autoAlpha: 1, duration:0.25, ease:'easeIn' });
    });

    const speedMultipliers = {
        600: 1.0,   // Base
        540: 0.9,
        480: 0.8,
        420: 0.7,
        360: 0.6,
        300: 0.5    // 1/2
    };

    const speedChanged = contextSafe((e, speedNum) => {
        if (!timelineRef.current || !activePlane) return;
        playSound("switchSpeed");

        const globalTime = timelineRef.current.time();
        const multiplier = speedMultipliers[speedNum] || 1.0;

        const planeGroupTimeline = timelineRef.current.getById(activePlane);

        if (planeGroupTimeline) {
            const localTime = (globalTime - planeGroupTimeline.startTime()) * planeGroupTimeline.timeScale();

            planeGroupTimeline.timeScale(multiplier);

            planeGroupTimeline.startTime(globalTime - (localTime / multiplier));
            setPlaneCurrentSpeeds(prev => ({ ...prev, [activePlane]: speedNum }));
        }
    });

    const handleTrackSwitchTrigger = contextSafe((planeKey) => {
        const result = switchTrack(planeKey);
        playSound(result && result.ok ? "trackSwitch" : "cantClick");
    });


    const activeTrackKey = activePlane ? planeTracks[activePlane] : null;
    const pendingTrackKey = activePlane ? nextTrackFor(activePlane) : null;
    const canSwitch = Boolean(activePlane && pendingTrackKey);
    const activePlaneConfig = activePlane ? levelConfig.startingConditions[activePlane] : null;
    const activePlaneCallsign = activePlaneConfig?.callsign || null;
    const activePlaneColor = activePlaneConfig?.color || null;

    // What a screen reader hears in place of a coloured diamond on a map
    // Track and speed are read from live state rather than the level config, so the label keeps
    // up after a switch or a speed change instead of describing the starting setup.
    const planeLabel = (planeKey, config) => {
        const trackKey = planeTracks[planeKey];
        const trackName = tracks[trackKey]?.label || trackKey || "no route";
        const knots = planeCurrentSpeeds[planeKey] || 600;
        return `${config.callsign}, route ${trackName}, ${knots} knots`;
    };

    // The simulator's keyboard model. Listed on the Controls screen
    useEffect(() => {
        const ARROWS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

        const onKeyDown = (event) => {
            if (document.querySelector('[role="dialog"]')) return;

            if (event.key === "Escape") {
                if (!activePlane) return;
                hideEverything();
                setActivePlane(null);
                return;
            }

            if (event.key === "Tab") {
                event.preventDefault();

                if (event.shiftKey) {
                    // Back out to the corner navigation, and step between its buttons on repeat presses so both Levels and Menu are reachable without Tab.
                    const nav = [...(containerRef.current?.querySelectorAll(".corner-nav") || [])];
                    if (!nav.length) return;
                    const at = nav.indexOf(document.activeElement);
                    nav[at === -1 ? 0 : (at - 1 + nav.length) % nav.length].focus();
                    return;
                }

                // Forward through the aircraft, wrapping. Focus follows the selection so the highlight lands where the player is looking.
                if (!activePlanes.length) return;
                const current = activePlanes.indexOf(activePlane);
                const nextKey = activePlanes[(current + 1) % activePlanes.length];
                selectPlane(nextKey);
                const marker = containerRef.current?.querySelector(
                    `[aria-label^="${levelConfig.startingConditions[nextKey]?.callsign}"]`
                );
                marker?.focus();
                return;
            }

            if (ARROWS.includes(event.key)) {

                const controls = [...(containerRef.current?.querySelectorAll(".stage-control") || [])]
                    .filter((element) => !element.disabled
                        && element.getAttribute("aria-disabled") !== "true"
                        && element.offsetParent !== null
                        && getComputedStyle(element).visibility !== "hidden");
                if (!controls.length) return;

                event.preventDefault();
                // Keyboard controls
                const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
                const at = controls.indexOf(document.activeElement);
                const next = at === -1
                    ? 0
                    : (at + (back ? -1 : 1) + controls.length) % controls.length;
                controls[next].focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activePlane, activePlanes, hideEverything, selectPlane, levelConfig]);



    return (
        <div ref={containerRef}
             className="w-full h-full bg-carbon-90 relative fade-out"
             onClick={hideAllTrails}
        >


            {/*Main Content Modal*/}
            <div className="absolute slide-in fade-out
                top-1/2 left-1/2
                p-[2cqmin]
                w-[90cqi] h-[90cqb]
                pointer-events-none
                "
                 onClick={(e) => e.stopPropagation()}
            >

                {/*Main Path SVG Background*/}
                <div className="absolute inset-0">
                    <SVGComponentTest color="FFFFFF"/>
                </div>


                {/*Main Path SVG Background*/}
                <div className="absolute inset-0">
                    <SVGComponent0 color="FFFFFF"/>
                </div>

                {/*Storms over the routes this level closes off*/}
                <div className="absolute inset-0 pointer-events-none">
                    <StormOverlay blockedTracks={blockedTracks}/>
                </div>


                {activePlanes.map((planeKey) => {
                    const config = levelConfig.startingConditions[planeKey];
                    const planeClass = config.planeId.replace('.', '');
                    const planeColor = config.color || DEFAULT_PLANE_COLOR;

                    return (
                        <div key={planeKey} className="absolute inset-0 w-full h-full pointer-events-none">

                            {candidateTracks(planeKey).map((trackKey) => {
                                const TrackSvg = tracks[trackKey].SvgComponent;

                                return (
                                    <div key={trackKey} className="absolute inset-0">
                                        <TrackSvg
                                            ref={(pathElement) => {
                                                if (!pathElement) return;
                                                if (!pathRefs.current[planeKey]) pathRefs.current[planeKey] = {};
                                                pathRefs.current[planeKey][trackKey] = pathElement;
                                            }}
                                            color={planeColor}
                                        />
                                    </div>
                                );
                            })}

                            <button
                                type="button"
                                className={`${planeClass} absolute pointer-events-auto cursor-pointer`}
                                aria-pressed={activePlane === planeKey}
                                aria-label={planeLabel(planeKey, config)}
                                onClick={(e) => handlePlaneClick(e, planeKey)}
                            >
                                <DiamondIconSVG
                                    color={planeColor}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    );
                })}

                {/*Range rings and callsigns, drawn over the planes*/}
                <div className="absolute inset-0 pointer-events-none">
                    <PlaneMarkerOverlay
                        activePlanes={activePlanes}
                        startingConditions={levelConfig.startingConditions}
                        getPlanePositions={getPlanePositions}
                    />
                </div>
            </div>


            {/*Exit to Main Menu Button*/}
            <ReturnToMenuBtn
                menuPressed={menuPressed}
            />

            {/*Back to Level Select Button*/}
            <ReturnToLevelsBtn
                levelsPressed={levelSelectPressed}
            />

            {/*Intro Banner SVG*/}
            <IntroBanner text={levelConfig.introText} />

            {/*Caption left behind once the intro banner has gone*/}
            <StageLevelLabel text={levelConfig.introText} />

            {/*Proximity Warning*/}
            <ProximityWarning visible={tooClose} />

            {/*Level Complete Popup*/}
            <LevelCompleteModal
                levelTitle={levelConfig.introText}
                score={score}
                elapsedSeconds={displayElapsedSeconds}
                hasNextLevel={Boolean(nextLevelId)}
                onNextLevel={nextLevelPressed}
                onRestart={restartLevelPressed}
                onMainMenu={menuPressed}
            />


            {/*Speed Controls*/}
            <div role="group"
                 aria-label={activePlane
                     ? `Speed for ${levelConfig.startingConditions[activePlane]?.callsign || activePlane}`
                     : "Speed, no aircraft selected"}
                 className="absolute fade-out flex flex-col text-center speedControls
            top-[2.5cqb] left-[2.5cqi]
            rounded-xl
            overflow-hidden
            w-[12cqi]
            z-10
            ">
                {/*Uses aircrafts own color to stand out more*/}
                <div className="w-full py-[1cqmin] text-[calc(1.8cqmin*var(--ui-scale,1))] font-hds-mono font-bold"
                     style={activePlaneColor
                         ? { backgroundColor: `#${activePlaneColor}`, color: readableTextOn(activePlaneColor) }
                         : undefined}
                >
                    {activePlaneCallsign || "No aircraft"}
                </div>

                {[600, 540, 480, 420, 360, 300].map((speedNum) => {
                    const currentSpeed = planeCurrentSpeeds[activePlane] || 600;
                    const isActive = currentSpeed === speedNum;

                    const inactiveStyles = "bg-carbon-70 text-spacesuit-white hover:bg-carbon-60";
                    const themeStyles = isActive ? "font-bold" : inactiveStyles;

                    return (
                        <button
                            tabIndex={-1}
                            key={speedNum}
                            aria-pressed={isActive}
                            style={isActive && activePlaneColor
                                ? { backgroundColor: `#${activePlaneColor}`, color: readableTextOn(activePlaneColor) }
                                : undefined}
                            className={`stage-control w-full py-[1cqmin] text-[calc(1.8cqmin*var(--ui-scale,1))] speedText transition-colors duration-150 border-t border-carbon-60/20 ${themeStyles} ${skipping ? "opacity-60 cursor-not-allowed" : ""}`}
                            disabled={skipping}
                            onClick={(e) => {
                                e.stopPropagation();
                                speedChanged(e, speedNum);
                            }}
                        >
                            {speedNum}kts
                        </button>
                    );
                })}
            </div>

            {/*Switch Controls*/}

            <div className="absolute fade-out text-center speedControls
            top-[2.5cqb] left-[16cqi]
            rounded-xl
            overflow-hidden
            w-[18cqi]
            z-10
            ">

                <HdsButton
                    variant="secondary"
                    className="stage-control w-full leading-tight"
                    tabIndex={-1}
                    label={canSwitch
                        ? `Switch to ${tracks[pendingTrackKey]?.label || pendingTrackKey}`
                        : "Switch Track"}
                    size="1.6cqmin"
                    disabled={!canSwitch || skipping}
                    onPress={() => handleTrackSwitchTrigger(activePlane)}
                />

                {activeTrackKey && (
                    <div className="bg-carbon-80 text-spacesuit-white w-full p-[1cqmin] text-[calc(1.5cqmin*var(--ui-scale,1))]">
                        On {tracks[activeTrackKey]?.label || activeTrackKey}
                    </div>
                )}
                {switchNotice && (
                    <div role="status"
                         className={`w-full p-[1cqmin] text-[calc(1.5cqmin*var(--ui-scale,1))] ${switchNotice.ok ? "bg-nasa-blue text-spacesuit-white" : "bg-nasa-red-shade text-spacesuit-white"}`}>
                        {switchNotice.ok
                            ? `Switched to ${tracks[switchNotice.to]?.label || switchNotice.to}`
                            : switchNotice.reason}
                    </div>
                )}
            </div>



            {/*Controls*/}
            <div className="absolute slide-in-element fade-out flex items-center
                bottom-[5cqb] left-[2.5cqi]
                w-[36cqi]
                p-[2cqmin]
                gap-[2cqmin]
                z-10
                ">

                <HdsIconButton
                    tabIndex={-1}
                    className="stage-control"
                    name="play"
                    label="Play"
                    size={TRANSPORT_SIZE}
                    disabled={skipping}
                    onPress={playPressed}
                />

                <HdsIconButton
                    tabIndex={-1}
                    className="stage-control"
                    name="pause"
                    label="Pause"
                    size={TRANSPORT_SIZE}
                    disabled={skipping}
                    onPress={pausePressed}
                />

                <HdsIconButton
                    tabIndex={-1}
                    className="stage-control"
                    name="rotate"
                    label="Restart level"
                    size={TRANSPORT_SIZE}
                    disabled={skipping}
                    onPress={resetPressed}
                />


                <HdsIconButton
                    tabIndex={-1}
                    className="stage-control"
                    text={`${currentSpeedLabel}x`}
                    label={`Simulation speed, currently ${currentSpeedLabel} times. Press to change.`}
                    size={TRANSPORT_SIZE}
                    disabled={skipping}
                    onPress={speedPressed}
                />

                {/*Skip Forward 30s*/}
                <HdsIconButton
                    tabIndex={-1}
                    className="stage-control"
                    text={`+${SKIP_SECONDS}s`}
                    label={skipping ? `Skipping ahead ${SKIP_SECONDS} seconds` : `Skip ahead ${SKIP_SECONDS} seconds`}
                    variant={skipping ? "secondary" : "utility"}
                    size={TRANSPORT_SIZE}
                    busy={skipping}
                    onPress={skipPressed}
                />

                {/*Elapsed Time Readout*/}
                <div className="flex items-center justify-center rounded-full font-hds-mono border
                    bg-[var(--hds-palette-utility-fill)]
                    border-[var(--hds-palette-utility-stroke)]
                    text-[var(--hds-palette-utility-icon)]"
                     style={{ width: TRANSPORT_SIZE, height: TRANSPORT_SIZE }}
                     aria-live="off"
                >
                    <span className="text-[calc(1.6cqmin*var(--ui-scale,1))]">
                        {displayElapsedSeconds.toFixed(1)}s
                    </span>
                </div>
            </div>

        </div>

    );

}
export default Stage;
