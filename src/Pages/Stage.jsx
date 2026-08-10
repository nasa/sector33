import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import { globalAnimations } from "../Components/globalAnimations.jsx";
import { PlayIconSVG, PauseIconSVG, ResetIconSVG, SpeedIconSVG, DiamondIconSVG } from "../../assets/resources/IconSVGs.jsx";
import { ReturnToMenuBtn, IntroBanner } from "../Components/UIComponents.jsx";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);
import {SVGComponent0, SVGComponentTest} from '../../assets/resources/PathSVGs.jsx';
import {
    tracks,
    startingConditions,
    calculateMotionPathProps,
    cycleTimelineSpeed,
    resetTimelineSpeed
} from "../Components/SimConfig";
import { useTrackSwitching } from "../Components/TrackSwitching";



const Stage = ({ onNavigate }) => {

    // Global Animations
    const { animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut } = globalAnimations();

    // References to DOM elements
    const containerRef = useRef(null);
    const timelineRef = useRef(null);


    // pathRefs.current[planeKey][trackKey] -> the <path> element of that track's SVG.
    // Every track a plane *could* fly is mounted, so switching never has to wait
    // for a React re-render to get a path element to animate along.
    const pathRefs = useRef({});

    const visibleTracksRef = useRef({});
    const trailTweenAddedRef = useRef({});

    // React state hooks for layout changes
    const [currentSpeedLabel, setCurrentSpeedLabel] = useState(1);
    const [activePlanes, setActivePlanes] = useState(["planeAlpha", "planeBeta"]);
    const [activePlane, setActivePlane] = useState("AAL12");
    const [planeCurrentSpeeds, setPlaneCurrentSpeeds] = useState({});

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
        nextTrackFor
    } = useTrackSwitching({ activePlanes, timelineRef, pathRefs });

    const { contextSafe } = useGSAP(() => {
        //On load animations
        introBannerSlideInOut();
        animateIn();
        gsap.to('.speedControls', { autoAlpha: 0, duration:0});

        buildAll();
    }, { scope: containerRef, dependencies: [activePlanes] });

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

    // Control Buttons (Standard syntax)
    const playPressed = contextSafe(function() {
        if (timelineRef.current) {
            timelineRef.current.play();
        }
    });

    const pausePressed = contextSafe(function() {
        if (timelineRef.current) {
            timelineRef.current.pause();
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
                    const config = startingConditions[planeKey];
                    const planeClass = config.planeId.replace('.', '');

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
                                            color="ef483f"
                                        />
                                    </div>
                                );
                            })}

                            <div className={`${planeClass} absolute pointer-events-auto cursor-pointer`}>
                                <DiamondIconSVG
                                    color="00FFFF"
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
            <IntroBanner text="Level 1" />


            {/*Speed Controls*/}
            <div className="absolute fade-out flex flex-col text-center speedControls
            top-[2.5cqi] left-[5cqb]
            rounded-xl
            overflow-hidden
            w-[10cqi] h-[27.5cqb]
            z-10
            ">
                <div className="text-[#FFFFFF]
                bg-emerald-600
                w-full h-[4cqmin]
                p-[1cqmin]
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
                            className={`w-full h-[5cqmin] p-[1cqmin] speedText transition-colors duration-150 border-t border-slate-600/20 ${themeStyles}`}
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
            top-[2.5cqi] left-[15cqb]
            rounded-xl border border-red-800
            overflow-hidden
            w-[14cqi]
            z-10
            ">
                <button className={`text-[#FFFFFF]
                w-full h-[4cqmin]
                p-[1cqmin]
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
            <div className="absolute slide-in-element fade-out flex items-center
                bottom-[5cqi] left-[2.5cqb]
                {/*border border-red-500*/}
                overflow-hidden
                w-[30cqi] h-[10cqb]
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
            </div>

        </div>

    );

}
export default Stage;
