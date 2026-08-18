import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import { globalAnimations } from "../Components/globalAnimations.jsx";
import { PlayIconSVG, PauseIconSVG, ResetIconSVG, SpeedIconSVG, DiamondIconSVG } from "../../assets/resources/IconSVGs.jsx";
import { ReturnToMenuBtn, IntroBanner, ProximityWarning, LevelCompleteModal } from "../Components/UIComponents.jsx";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);
import {SVGComponent0, SVGComponentTest} from '../../assets/resources/PathSVGs.jsx';
import {
    tracks,
    cycleTimelineSpeed,
    resetTimelineSpeed,
    DEFAULT_PLANE_COLOR
} from "../Components/SimConfig";
import { useTrackSwitching } from "../Components/TrackSwitching";
import { getLevelConfig, getNextLevelId, activePlanesFor } from "../Components/LevelConfig.jsx";
import { useCollisionTracking } from "../Components/collisionTracking.jsx";
import { useFinishTracking } from "../Components/FinishTracking.jsx";
import { evaluateScore } from "../Components/ScoreConfig.jsx";



const Stage = ({ onNavigate, levelId }) => {

    // Global Animations
    const { animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut } = globalAnimations();

    const levelConfig = getLevelConfig(levelId);

    // References to DOM elements
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    // Real time stopwatch used to score the run, kept as refs so the GSAP
    // onComplete callback always reads the live value rather than a stale closure.
    const runStartRef = useRef(null);
    const elapsedMsRef = useRef(0);
    const isPlayingRef = useRef(false);


    // pathRefs.current[planeKey][trackKey] -> the <path> element of that track's SVG.
    // Every track a plane *could* fly is mounted, so switching never has to wait
    // for a React re-render to get a path element to animate along.
    const pathRefs = useRef({});

    const visibleTracksRef = useRef({});
    const trailTweenAddedRef = useRef({});

    // Derived straight from levelConfig every render, rather than mirrored into its
    // own state, so it can never lag a render behind when levelId changes (a stale
    // planeKey here crashes the render, since JSX looks it up in levelConfig).
    const activePlanes = useMemo(() => activePlanesFor(levelConfig), [levelConfig]);

    // React state hooks for layout changes
    const [currentSpeedLabel, setCurrentSpeedLabel] = useState(1);
    const [activePlane, setActivePlane] = useState("AAL12");
    const [planeCurrentSpeeds, setPlaneCurrentSpeeds] = useState({});
    const [score, setScore] = useState(null);
    const [displayElapsedSeconds, setDisplayElapsedSeconds] = useState(0);

    const [visibleTracks, setVisibleTracks] = useState({});

    // All track ownership, trail visibility and switching lives here.
    const {
        planeTracks,
        trailVisible,
        switchNotice,
        clearSwitchNotice,
        buildAll,
        switchTrack,
        showTrail,
        hideTrail,
        hideAllTrails,
        candidateTracks,
        nextTrackFor,
        getPlanePositions,
        extendPlaneTo,
        rebuildPlanePaths
    } = useTrackSwitching({ activePlanes, timelineRef, pathRefs, startingConditions: levelConfig.startingConditions });

    // Warns when any two planes cross the level's separation distance, and keeps a
    // sticky flag for scoring once separation has ever been lost.
    const { tooClose, everTooCloseRef, resetCollisionState } = useCollisionTracking({
        activePlanes,
        getPlanePositions,
        separationPx: levelConfig.separationPx
    });

    // Clear the previous run's score and stopwatch whenever a different level is selected.
    useEffect(() => {
        runStartRef.current = null;
        elapsedMsRef.current = 0;
        isPlayingRef.current = false;
        setDisplayElapsedSeconds(0);
        setScore(null);
        resetCollisionState();
    }, [levelId]);

    // Drives the elapsed time readout by the controls. Reads the master timeline's
    // own clock so the readout speeds up along with the timeScale speed button,
    // separate from the wall-clock stopwatch used for scoring below.
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

    // Scores the run once every plane has come to rest. Uses real wall-clock time
    // (not the timeline's own clock) so using the speed button to finish faster
    // in real life actually earns a better score.
    const handleLevelComplete = () => {
        const now = Date.now();
        const totalMs = elapsedMsRef.current + (runStartRef.current ? now - runStartRef.current : 0);
        runStartRef.current = null;
        isPlayingRef.current = false;
        elapsedMsRef.current = totalMs;
        // Every plane has stopped on its slot by the time this fires, so the sim
        // can be frozen without cutting a plane short of the lineup
        if (timelineRef.current) {
            setDisplayElapsedSeconds(timelineRef.current.time());
            timelineRef.current.pause();
        }

        setScore(evaluateScore({
            completed: true,
            everTooClose: everTooCloseRef.current,
            elapsedSeconds: totalMs / 1000,
            idealTimeSeconds: levelConfig.idealTimeSeconds
        }));
    };

    // Lines planes up past MOD as they arrive, and ends the level once they have all stopped.
    const { resetFinishTracking } = useFinishTracking({
        activePlanes,
        getPlanePositions,
        extendPlaneTo,
        onAllPlanesFinished: handleLevelComplete
    });

    const { contextSafe } = useGSAP(() => {
        //On load animations
        introBannerSlideInOut();
        animateIn();
        gsap.to('.speedControls', { autoAlpha: 0, duration:0});

        buildAll();
    }, { scope: containerRef, dependencies: [activePlanes] });

    // Watched rather than called inline so the observer below always runs the current one
    const rebuildPlanePathsRef = useRef(rebuildPlanePaths);
    rebuildPlanePathsRef.current = rebuildPlanePaths;

    // Rebuild the motion paths whenever the canvas changes size, otherwise the planes
    // keep flying the pixel coordinates baked in at the previous size and drift off track.
    useEffect(() => {
        const element = containerRef.current;
        if (!element || typeof ResizeObserver === "undefined") return undefined;

        let frame;
        const observer = new ResizeObserver(() => {
            // Dragging a window edge fires this continuously, so collapse the burst
            // into a single rebuild on the next frame.
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => rebuildPlanePathsRef.current());
        });

        observer.observe(element);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, []);

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

    const nextLevelId = getNextLevelId(levelConfig.id);

    // Level complete popup actions
    const nextLevelPressed = () => onNavigate('Stage', nextLevelId);
    const restartLevelPressed = () => resetPressed();

    // Control Buttons (Standard syntax)
    const playPressed = contextSafe(function() {
        if (timelineRef.current) {
            if (!runStartRef.current) runStartRef.current = Date.now();
            isPlayingRef.current = true;
            timelineRef.current.play();
        }
    });

    const pausePressed = contextSafe(function() {
        if (timelineRef.current) {
            if (runStartRef.current) {
                elapsedMsRef.current += Date.now() - runStartRef.current;
                runStartRef.current = null;
            }
            isPlayingRef.current = false;
            timelineRef.current.pause();
            setDisplayElapsedSeconds(timelineRef.current.time());
        }
    });

    // Reset rebuilds rather than restarts. A plane that switched track has its new
    // leg spliced into the master at the moment of the switch, so a plain
    // restart() would leave it parked until that time came round again.
    const resetPressed = contextSafe(function() {
        buildAll();
        timelineRef.current.pause();
        setPlaneCurrentSpeeds({});
        setCurrentSpeedLabel(resetTimelineSpeed(timelineRef.current));

        runStartRef.current = null;
        elapsedMsRef.current = 0;
        isPlayingRef.current = false;
        setDisplayElapsedSeconds(0);
        setScore(null);
        resetCollisionState();
        resetFinishTracking();
    });

    const speedPressed = contextSafe(function() {
        if (timelineRef.current) {
            const activeSpeed = cycleTimelineSpeed(timelineRef.current);
            setCurrentSpeedLabel(activeSpeed);
        }
    });


    // Show/Hide Plane Trails
    const hideEverything = contextSafe(() => {
        hideAllTrails();
        gsap.to('.speedControls', { autoAlpha: 0, duration:0.25, ease:'easeOut' });
    });


    const handlePlaneClick = contextSafe((e, planeKey) => {
        e.stopPropagation();
        // If same plane clicked do nothing
        if (trailVisible[planeKey]) return;
        // hide all other trails
        hideAllTrails();
        // reveal the trail of the plane clicked
        showTrail(planeKey);

        // display speed controls
        displaySpeedControls(e, planeKey);
        setActivePlane(planeKey);
    });

    // Show/Hide Speed Controls per plane
    const displaySpeedControls = contextSafe((e, planeKey) => {
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
        switchTrack(planeKey);
    });


    const activeTrackKey = activePlane ? planeTracks[activePlane] : null;
    const pendingTrackKey = activePlane ? nextTrackFor(activePlane) : null;
    const canSwitch = Boolean(activePlane && pendingTrackKey);



    return (
        <div ref={containerRef}
             className="w-full h-full bg-slate-900 relative fade-out"
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


                {activePlanes.map((planeKey) => {
                    const config = levelConfig.startingConditions[planeKey];
                    const planeClass = config.planeId.replace('.', '');
                    const planeColor = config.color || DEFAULT_PLANE_COLOR;

                    return (
                        <div key={planeKey} className="absolute inset-0 w-full h-full pointer-events-none">

                            {/* Every track this plane can fly is mounted. Only the one it
                                is currently on is ever given opacity, so the others are
                                invisible ref-holders ready to be switched onto. */}
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

                            <div className={`${planeClass} absolute pointer-events-auto cursor-pointer`}>
                                <DiamondIconSVG
                                    color={planeColor}
                                    onClick={(e) => handlePlaneClick(e, planeKey)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>


            {/*Exit to Main Menu Button*/}
            <ReturnToMenuBtn
                onClick={(e) => e.stopPropagation()}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                menuPressed={menuPressed}
            />

            {/*Intro Banner SVG*/}
            <IntroBanner text={levelConfig.introText} />

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
            {/* Height is left to the content so every speed option fits, and the
                offsets use cqi across and cqb down so the panel keeps its gap to
                the switch panel at any canvas size. */}
            <div className="absolute fade-out flex flex-col text-center speedControls
            top-[2.5cqb] left-[2.5cqi]
            rounded-xl
            overflow-hidden
            w-[12cqi]
            z-10
            ">
                <div className="text-[#FFFFFF]
                bg-emerald-600
                w-full
                py-[1cqmin]
                text-[1.8cqmin]
                ">
                    {activePlane || "No plane"}
                </div>

                {[600, 540, 480, 420, 360, 300].map((speedNum) => {
                    const currentSpeed = planeCurrentSpeeds[activePlane] || 600;
                    const isActive = currentSpeed === speedNum;

                    //Simple hover no gsap for draft
                    const activeStyles = "bg-blue-500 text-white font-bold";
                    const inactiveStyles = "bg-slate-500 text-[#3b3a3a] hover:bg-slate-400";
                    const themeStyles = isActive ? activeStyles : inactiveStyles;

                    return (
                        <button
                            key={speedNum}
                            className={`w-full py-[1cqmin] text-[1.8cqmin] speedText transition-colors duration-150 border-t border-slate-600/20 ${themeStyles}`}
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
            {/* Sits clear of the speed panel, which ends at 14.5cqi, and is wide
                enough for the longest track label without the button clipping. */}
            <div className="absolute fade-out text-center speedControls
            top-[2.5cqb] left-[16cqi]
            rounded-xl border border-red-800
            overflow-hidden
            w-[18cqi]
            z-10
            ">
                <button className={`text-[#FFFFFF]
                w-full
                py-[1cqmin] px-[1.5cqmin]
                text-[1.6cqmin] leading-tight
                ${canSwitch ? "bg-orange-400 hover:bg-orange-300" : "bg-slate-600 cursor-not-allowed"}
                `}
                        disabled={!canSwitch}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleTrackSwitchTrigger(activePlane);
                        }}
                >
                    {canSwitch
                        ? `Switch to ${tracks[pendingTrackKey]?.label || pendingTrackKey}`
                        : "Switch Track"}
                </button>

                {activeTrackKey && (
                    <div className="bg-slate-800 text-[#FFFFFF] w-full p-[1cqmin] text-[1.5cqmin]">
                        On {tracks[activeTrackKey]?.label || activeTrackKey}
                    </div>
                )}

                {switchNotice && (
                    <div className={`w-full p-[1cqmin] text-[1.5cqmin] ${switchNotice.ok ? "bg-emerald-700 text-white" : "bg-red-800 text-white"}`}>
                        {switchNotice.ok
                            ? `Switched to ${tracks[switchNotice.to]?.label || switchNotice.to}`
                            : switchNotice.reason}
                    </div>
                )}
            </div>



            {/*Controls*/}
            {/* Height is left to the content: a fixed height plus overflow-hidden
                clipped the bottom of the round buttons, whose 7.5cqmin plus padding
                comes to 11.5cqmin. */}
            <div className="absolute slide-in-element fade-out flex items-center
                bottom-[5cqb] left-[2.5cqi]
                w-[30cqi]
                p-[2cqmin]
                gap-[2cqmin]
                z-10
                ">

                <button className="text-[#3b3a3a]
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                p-[1cqmin]
                "
                        onMouseEnter={() => handleMouseEnter(".PlayIcon", null, null)}
                        onMouseLeave={() => handleMouseLeave(".PlayIcon", null, null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            playPressed();
                        }}
                >
                    <PlayIconSVG className="PlayIcon w-full h-full"/>
                </button>


                <button className="text-[#3b3a3a]
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                p-[1cqmin]
                "
                        onMouseEnter={() => handleMouseEnter(".PauseIcon", null, null)}
                        onMouseLeave={() => handleMouseLeave(".PauseIcon", null, null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            pausePressed();
                        }}

                >
                    <PauseIconSVG className="PauseIcon w-full h-full"/>
                </button>


                <button className="text-[#3b3a3a]
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                p-[1cqmin]
                "
                        onMouseEnter={() => handleMouseEnter(".ResetIcon", null, null)}
                        onMouseLeave={() => handleMouseLeave(".ResetIcon", null, null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            resetPressed();
                        }}
                >
                    <ResetIconSVG className="ResetIcon w-full h-full"/>
                </button>

                <button className="text-[#3b3a3a]
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                p-[1cqmin]
                "
                        onMouseEnter={() => handleMouseEnter(".SpeedIcon", null, null)}
                        onMouseLeave={() => handleMouseLeave(".SpeedIcon", null, null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            speedPressed();
                        }}
                >
                    <div className= "flex items-center justify-center">
                        <SpeedIconSVG className="SpeedIcon w-full h-full"/>
                        <span className="text-[2cqmin]">
                            {currentSpeedLabel}x
                        </span>
                    </div>

                </button>

                {/*Elapsed Time Readout*/}
                <div className="text-[#FFFFFF] font-mono
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                flex items-center justify-center
                ">
                    <span className="text-[1.6cqmin]">
                        {displayElapsedSeconds.toFixed(1)}s
                    </span>
                </div>
            </div>

        </div>

    );

}
export default Stage;
