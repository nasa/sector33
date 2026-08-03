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

    const { contextSafe } = useGSAP(() => {
        introBannerSlideInOut();
        animateIn();

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

                gsap.set(pathElement, {
                    strokeDasharray: totalLength,
                    strokeDashoffset: initialOffset,
                    opacity: 0
                });

                timelineRef.current.to(config.planeId, {
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

            timelineRef.current.to(pathElement, {
                strokeDashoffset: finalOffset,
                duration: motionProps.duration,
                ease: motionProps.ease
            }, 0);

            trailTweenAddedRef.current[planeKey] = true;
        }

        gsap.set(pathElement, { opacity: 1 });

    });

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
    });


    const handlePlaneClick = contextSafe((e, planeKey) => {
        e.stopPropagation();
        if (visibleTracksRef.current[planeKey]) return;
        revealTrail(planeKey);
        timelineRef.current.render(timelineRef.current.time(), true, true);
        visibleTracksRef.current[planeKey] = true;
        setVisibleTracks(prev => ({ ...prev, [planeKey]: true }));
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



            {/*Controls*/}
            <div className="absolute slide-in-element fade-out flex items-center
                bottom-[5cqi] left-[5cqb]
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
