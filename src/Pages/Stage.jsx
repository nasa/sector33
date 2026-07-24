import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import { globalAnimations } from "../Components/globalAnimations.jsx";
import { PlayIconSVG, PauseIconSVG, ResetIconSVG, SpeedIconSVG } from "../../assets/resources/IconSVGs.jsx";
import { ReturnToMenuBtn, IntroBanner } from "../Components/UIComponents.jsx";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

import { SVGComponent0, SVGComponent1, SVGComponent6 } from '../../assets/resources/PathSVGs.jsx';
import { SimpleBox } from '../../assets/resources/BOX.jsx';
import { useSimConfig } from "/src/Pages/SimConfig.jsx";

const Stage = ({ onNavigate }) => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    // Track simulation speed multiplier state
    const [simSpeed, setSimSpeed] = useState(1);

    // Fetch global animations and config values
    const { animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut } = globalAnimations();
    const { startingConditions } = useSimConfig();

    const { contextSafe } = useGSAP({ scope: containerRef });

    // Page Leave Animations
    const menuPressed = () => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    };

    // Page Enter Animations
    useGSAP(() => {
        introBannerSlideInOut();
        animateIn('.slide-in');
    }, { scope: containerRef });

    // Sync timeline speed whenever simSpeed state changes
    useEffect(() => {
        if (timelineRef.current) {
            timelineRef.current.timeScale(simSpeed);
        }
    }, [simSpeed]);

    // Setup the Timeline Dynamically with pixel-perfect speed calculations
    const initTimeline = contextSafe(() => {
        if (timelineRef.current) return;

        timelineRef.current = gsap.timeline({ paused: true });

        // Calculate dynamic duration for Box 1
        const path1 = document.querySelector(".motion-track-1");
        if (path1) {
            const length1 = MotionPathPlugin.getLength(path1);
            const dist1 = Math.abs(startingConditions.box1.start - startingConditions.box1.end);
            const duration1 = (length1 * dist1) / startingConditions.speed;

            timelineRef.current.to(".moving-box-1", {
                motionPath: {
                    path: ".motion-track-1",
                    align: ".motion-track-1",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    start: startingConditions.box1.start,
                    end: startingConditions.box1.end
                },
                duration: duration1,
                ease: "none"
            }, 0);
        }

        // Calculate dynamic duration for Box 2
        const path2 = document.querySelector(".motion-track-6");
        if (path2) {
            const length2 = MotionPathPlugin.getLength(path2);
            const dist2 = Math.abs(startingConditions.box2.start - startingConditions.box2.end);
            const duration2 = (length2 * dist2) / startingConditions.speed;

            timelineRef.current.to(".moving-box-2", {
                motionPath: {
                    path: ".motion-track-6",
                    align: ".motion-track-6",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    start: startingConditions.box2.start,
                    end: startingConditions.box2.end
                },
                duration: duration2,
                ease: "none"
            }, 0);
        }

        // Apply the active state multiplier right after creation
        timelineRef.current.timeScale(simSpeed);
    });






    // Button Handling
    const playPressed = contextSafe(() => {
        initTimeline();
        if (timelineRef.current) timelineRef.current.play();
    });

    const pausePressed = contextSafe(() => {
        if (timelineRef.current) timelineRef.current.pause();
    });

    const resetPressed = contextSafe(() => {
        if (timelineRef.current) timelineRef.current.restart().pause();
    });

    // Change Speed
    const changeSimSpeed = (speedMultiplier) => {
        setSimSpeed(10);
    };


    return (
        <div ref={containerRef}
             className="w-full h-full bg-slate-900 relative fade-out border border-red-400"
        >

            {/*Exit to Main Menu Button*/}
            <ReturnToMenuBtn
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                menuPressed={menuPressed}
            />

            {/*Intro Banner SVG*/}
            <IntroBanner text="Level 1" />



            {/*Controls*/}
            <div className="absolute slide-in fade-out flex items-center
                bottom-[5cqi] left-[5cqb]
                border border-red-500
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
                        onMouseEnter={() => handleMouseEnter(".PlayIcon", "null", "null")}
                        onMouseLeave={() => handleMouseLeave(".PlayIcon", "null", "null")}
                        onClick={playPressed}
                >
                    <PlayIconSVG className="PlayIcon w-full h-full"/>
                </button>


                <button className="text-[#3b3a3a]
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                p-[1cqmin]
                "
                        onMouseEnter={() => handleMouseEnter(".PauseIcon", "null", "null")}
                        onMouseLeave={() => handleMouseLeave(".PauseIcon", "null", "null")}
                        onClick={() => pausePressed()}
                >
                    <PauseIconSVG className="PauseIcon w-full h-full"/>
                </button>


                <button className="text-[#3b3a3a]
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                p-[1cqmin]
                "
                        onMouseEnter={() => handleMouseEnter(".ResetIcon", "null", "null")}
                        onMouseLeave={() => handleMouseLeave(".ResetIcon", "null", "null")}
                        onClick={() => resetPressed()}
                >
                    <ResetIconSVG className="ResetIcon w-full h-full"/>
                </button>

                <button className="text-[#3b3a3a]
                border border-blue-500 bg-slate-500 rounded-full
                w-[7.5cqmin] h-[7.5cqmin]
                p-[1cqmin]
                "
                        onMouseEnter={() => handleMouseEnter(".SpeedIcon", "null", "null")}
                        onMouseLeave={() => handleMouseLeave(".SpeedIcon", "null", "null")}
                        onClick={() => changeSimSpeed()}
                >
                    <SpeedIconSVG className="SpeedIcon w-full h-full"/>
                </button>
            </div>


            {/*Main Content Modal*/}
            <div className="absolute slide-in fade-out
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                p-[2cqmin]
                w-[90cqi] h-[90cqb]
                pointer-events-none
                ">

                {/*Main Path SVG Background*/}
                <div className="absolute inset-0 p-[2cqmin]">
                    <SVGComponent0 color="FFFFFF"/>
                </div>

                {/*Conditionally Rendered Highlighted Path 1*/}
                <div className="absolute inset-0 p-[2cqmin] pointer-events-auto [--glow:#ef483f] filter-[drop-shadow(0_0_15px_var(--glow))]">
                    <SVGComponent1 color="ef483f"/>
                    <SimpleBox className="moving-box-1"/>
                </div>

                {/*Conditionally Rendered Highlighted Path 2*/}
                <div className="absolute inset-0 p-[2cqmin] pointer-events-auto [--glow:#ef483f] filter-[drop-shadow(0_0_15px_var(--glow))]">
                    <SVGComponent6 color="ef483f"/>
                    <SimpleBox className="moving-box-2"/>
                </div>


            </div>
        </div>
    );
}
export default Stage;
