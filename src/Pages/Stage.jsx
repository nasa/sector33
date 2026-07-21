import React, {useRef, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import { QuitBtnSVG, InfoSVG } from '../../assets/resources/SVGs.jsx';
import { TestPath } from '../../assets/resources/Paths.jsx';
import {globalAnimations} from "../globalAnimations.jsx";
import {ExitSVG, LearnSVG, PlaneSVG} from "../../assets/resources/Icons.jsx";


import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import MainMenu from "./MainMenu.jsx";
import {Tutorial_Data} from "../tutorialData.jsx";
gsap.registerPlugin(MotionPathPlugin)



const Stage = ({ onNavigate }) => {
    const containerRef = useRef(null);

    // Destructure universal animations
    const {animateIn, animateOut} = globalAnimations();

    // Run the page entrance animation
    const {contextSafe} = useGSAP(() => {
        gsap.timeline()
            .to(".intro", {xPercent: 100, duration: 1.5, ease: "power4.out"}, 0.5)
            .to(".intro", {xPercent: -100, duration: 1.5, ease: "power4.in"}, 5)
            .to(".intro", {autoAlpha: 0, duration: 0.5});
        animateIn('.slide-in');

    }, {scope: containerRef});

    // Button Mouse Enter and Leave
    const handleMouseEnter = contextSafe((e) => {
        const text= `.${e[0]}`;
        const svg = `.${e[1]}`;
        const shapeSvg = `.${e[2]}`;

        //context safe timeline, gsap cleans up automatically
        gsap.timeline()
            .to(text, { color: "#FFFFFF", scale: 1.1, duration: 0.5 })
            .to(svg, { color: "#FFFFFF", scale: 1.1, duration: 0.5 }, 0)
            .to(shapeSvg, {scale: 1.05, duration: 0.5 }, 0);
    });

    const handleMouseLeave = contextSafe((e) => {
        const text = `.${e[0]}`;
        const svg = `.${e[1]}`;
        const shapeSvg = `.${e[2]}`;

        // Animate them back to their original state smoothly
        gsap.timeline()
            .to(text, { color: "#3b3a3a", scale: 1, duration: 0.5 })
            .to(svg, { color: "#3b3a3a", scale: 1, duration: 0.5 }, 0)
            .to(shapeSvg, {scale: 1, duration: 0.5 }, 0);

    });

    // Handle page exit sequence
    const menuPressed = () => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    };


    // Motion Path Nodes References
    const pathRef = useRef(null);
    const movingObjectRef = useRef(null);

    useGSAP(() => {
        if (!pathRef.current || !movingObjectRef.current) return;

        gsap.to(movingObjectRef.current, {
            duration: 50,
            ease: "linear",
            motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
            },
        });
    }, { scope: containerRef });


    return (
        <div ref={containerRef}
             className="w-full h-full bg-slate-900 relative fade-out"
             style={{containerType: 'size'}}>

            {/*Exit to Main Menu Button*/}
            <button className="absolute
                top-[2cqh] right-[2cqw]
                w-[20cqmin] h-[10cqmin]
                "
                    onMouseEnter={() => handleMouseEnter(["menuText", "quitDoorSVG", "quitShapeSVG"])}
                    onMouseLeave={() => handleMouseLeave(["menuText", "quitDoorSVG", "quitShapeSVG"])}
                    onClick={() => menuPressed()}
            >
                {/*Parent Wrapper Container for Start*/}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-[#3b3a3a]">
                    <ExitSVG className="quitDoorSVG w-[8cqmin] h-[8cqmin]"/>
                    <span className="menuText text-[3cqmin] font-mono font-bold">
                                MENU
                            </span>
                </div>

                <QuitBtnSVG className="quitShapeSVG" style={{'--svg-fill': '#6c757d', '--svg-shadow': '#495057'}}></QuitBtnSVG>

            </button>

            {/*Intro Banner SVG*/}
            <div className="absolute top-[10%] left-0 -translate-x-full w-[45cqmin] intro">
                <InfoSVG className="w-full h-auto opacity-50"
                         style={{'--svg-fill': '#9f9a9a ', '--svg-shadow': '#2e2e2e'}}
                />

                {/*Text inside SVG*/}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-emerald-400 font-bold font-mono text-[2.5cqmin] tracking-wide">
                            Stage 1
                        </span>
                </div>
            </div>

            {/* Main Content: Render Externalized SVG Canvas and Pass Shared Tracking Nodes */}
            <TestPath ref={{ pathRef, objectRef: movingObjectRef }} />

            </div>
    );
}
export default Stage;
