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
import { tracks, startingConditions, calculateMotionPathProps, cycleTimelineSpeed } from "../Components/SimConfig";




const Stage = ({ onNavigate }) => {

    // Global Animations
    const { animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut } = globalAnimations();

    // References to DOM elements
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    const pathRefs = useRef({});

    const visibleTracksRef = useRef({});

    const trailTweenAddedRef = useRef({});

    // React state hooks for layout changes
    const [currentSpeedLabel, setCurrentSpeedLabel] = useState(1);
    const [activePlanes, setActivePlanes] = useState(["planeAlpha", "planeBeta"]);
    const [visibleTracks, setVisibleTracks] = useState({});
    const [activePlane, setActivePlane] = useState("AAL12");
    const [planeCurrentSpeeds, setPlaneCurrentSpeeds] = useState({});

    const { contextSafe } = useGSAP(() => {
        //On load animations
        introBannerSlideInOut();
        animateIn();
        gsap.to('.speedControls', { autoAlpha: 0, duration:0});


        if (timelineRef.current) timelineRef.current.kill();
        timelineRef.current = gsap.timeline({ paused: true });

        activePlanes.forEach((planeKey) => {
            const config = startingConditions[planeKey];
            const track = tracks[config.trackKey];
            const pathElement = pathRefs.current[planeKey];

            if (pathElement && track) {
                const totalLength = pathElement.getTotalLength();
                const motionProps = calculateMotionPathProps(config, track.SvgComponent, totalLength);
                const initialOffset = totalLength * (1 - motionProps.startProgress);

                const planeGroupTimeline = gsap.timeline({ id: planeKey });

                gsap.set(pathElement, {
                    strokeDasharray: totalLength,
                    strokeDashoffset: initialOffset,
                    opacity: 0
                });

                planeGroupTimeline.to(config.planeId, {
                    motionPath: {
                        path: pathElement,
                        align: pathElement,
                        alignOrigin: motionProps.alignOrigin,
                        autoRotate: motionProps.autoRotate,
                        start: motionProps.startProgress,
                        end: motionProps.endProgress
                    },
                    duration: motionProps.duration,
                    ease: motionProps.ease
                }, 0);

                timelineRef.current.add(planeGroupTimeline, 0);
            }
        });


        activePlanes.forEach((planeKey) => {
            if (visibleTracksRef.current[planeKey]) {
                revealTrail(planeKey);
            }
        });

        timelineRef.current.progress(0.0001);
    }, { scope: containerRef, dependencies: [activePlanes] });



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

    const resetPressed = contextSafe(function() {
        if (timelineRef.current) {
            timelineRef.current.restart().pause();
        }
    });

    const speedPressed = contextSafe(function() {
        if (timelineRef.current) {
            const activeSpeed = cycleTimelineSpeed(timelineRef.current);
            setCurrentSpeedLabel(activeSpeed);
        }
    });

    const revealTrail = contextSafe((planeKey) => {
        const config = startingConditions[planeKey];
        const track = tracks[config.trackKey];
        const pathElement = pathRefs.current[planeKey];

        if (!pathElement || !track || !timelineRef.current) return;

        if (!trailTweenAddedRef.current[planeKey]) {
            const totalLength = pathElement.getTotalLength();
            const motionProps = calculateMotionPathProps(config, track.SvgComponent, totalLength);
            const finalOffset = totalLength * (1 - motionProps.endProgress);

            const planeGroupTimeline = timelineRef.current.getById(planeKey);

            if (planeGroupTimeline) {
                planeGroupTimeline.to(pathElement, {
                    strokeDashoffset: finalOffset,
                    duration: motionProps.duration,
                    ease: motionProps.ease
                }, 0);
            }

            trailTweenAddedRef.current[planeKey] = true;
        }

        gsap.set(pathElement, { opacity: 1 });
    });



    // Show/Hide Plane Trails
    const hideTrail = contextSafe((planeKey) => {
        const pathElement = pathRefs.current[planeKey];
        if (!pathElement || !visibleTracksRef.current[planeKey]) return;

        gsap.set(pathElement, { opacity: 0 });

        visibleTracksRef.current[planeKey] = false;
        setVisibleTracks(prev => ({ ...prev, [planeKey]: false }));
    });

    const hideAllTrails = contextSafe(() => {
        activePlanes.forEach((planeKey) => {
            if (visibleTracksRef.current[planeKey]) hideTrail(planeKey);
        });
        gsap.to('.speedControls', { autoAlpha: 0, duration:0.25, ease:'easeOut' });

    });


    const handlePlaneClick = contextSafe((e, planeKey) => {
        e.stopPropagation();
        // If same plane clicked do nothing
        if (visibleTracksRef.current[planeKey]) return;
        // hide all other trails
        hideAllTrails();
        // reveal the trail of the plane clicked
        revealTrail(planeKey);
        // timeline
        timelineRef.current.render(timelineRef.current.time(), true, true);
        visibleTracksRef.current[planeKey] = true;
        setVisibleTracks(prev => ({ ...prev, [planeKey]: true }));

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
        if (!timelineRef.current) return;

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
                    const track = tracks[config.trackKey];
                    const TrackSvg = track.SvgComponent;
                    const planeClass = config.planeId.replace('.', '');

                    const pathEl = pathRefs.current[planeKey];
                    const totalLength = pathEl ? pathEl.getTotalLength() : 0;

                    return (
                        <div key={planeKey} className="absolute inset-0 w-full h-full pointer-events-none">

                            <TrackSvg
                                ref={(svgElement) => { if (svgElement) pathRefs.current[planeKey] = svgElement; }}
                                color="ef483f"
                                style={{
                                    "--length": totalLength
                                }}
                            />

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
                w-full h-4cqmin]
                p-[1cqmin]
                ">
                    {activePlane}
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
