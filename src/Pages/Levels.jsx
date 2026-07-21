import React, {useRef, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import {LEVELS_DATA} from "../levelsData.jsx";
import {
    QuitBtnSVG,
    InfoSVG
} from '../../assets/resources/SVGs.jsx';
import {globalAnimations} from "../globalAnimations.jsx";
import {ExitSVG, PlaneSVG} from "../../assets/resources/Icons.jsx";

const Levels = ({ onNavigate }) => {

    const containerRef = useRef(null);

    const {animateIn, animateOut} = globalAnimations();

    const {contextSafe} = useGSAP(() => {
        gsap.timeline()
            .to(".intro", {xPercent: 100, duration: 1.5, ease: "power4.out"}, 0.5)
            .to(".intro", {xPercent: -100, duration: 1.5, ease: "power4.in"}, 5)
            .to(".intro", {autoAlpha: 0, duration: 0.5});
        animateIn('.slide-in');

    }, {scope: containerRef});

    const onFinish = contextSafe(() => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    });

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


    return (
        <div ref={containerRef}
             className="w-full h-full bg-slate-900 relative"
             style={{containerType: 'size'}}>

                {/*Exit to Main Menu Button*/}
                <button className="absolute fade-out
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
                <div className="absolute top-[10%] left-0 -translate-x-full w-[45cqmin] intro fade-out">
                    <InfoSVG className="w-full h-auto opacity-50"
                        style={{'--svg-fill': '#9f9a9a ', '--svg-shadow': '#2e2e2e'}}
                    />

                    {/*Text inside SVG*/}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-emerald-400 font-bold font-mono text-[2.5cqmin] tracking-wide">
                            Select your Level!
                        </span>
                    </div>
                </div>


                {/*/!*Main Content Modal*!/*/}
                {/*<div className="absolute slide-in fade-out*/}
                {/*top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2*/}
                {/*p-[2cqmin] overflow-y-auto*/}
                {/*w-[70cqmin] h-[60cqmin]*/}
                {/*">*/}
                {/*    text*/}
                {/*</div>*/}

            {/*Levels Menu*/}
            <div className="levelsMenu fixed inset-0 h-screen overflow-hidden flex items-center justify-center z-20">
                {/* Grid */}
                <div className="m-5 justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full max-w-7xl">
                    {LEVELS_DATA.map((level) => (
                        <div
                            key={level.id}
                            className="text-[#142857] rounded-lg shadow font-semibold text-center"
                        >
                            <div
                                className={`group transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-1 relative flex h-80 w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 ${level.bgColor} ${level.borderColor}`}
                            >
                                <div
                                    className="absolute inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center text-gray-700 shadow-none"
                                    style={{ backgroundImage: `url(${level.image})` }}
                                >
                                    <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black/80 via-black/50 to-black/10 flex items-end justify-center p-6">
                                        <h3 className="text-white text-2xl font-bold font-mono">
                                            {level.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>









        </div>

    );
}

    export default Levels;





