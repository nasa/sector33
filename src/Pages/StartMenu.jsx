import React, {useRef, useState} from 'react';
import { ReturnSVG, PlaneSVG, LevelSVG, LearnSVG,} from "../../assets/resources/Icons.jsx";
import {StartBtnSvg, BackBtnSVG,} from '../../assets/resources/SVGs.jsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {globalAnimations} from "../globalAnimations.jsx";
gsap.registerPlugin(useGSAP);


const StartMenu = ({ onNavigate }) => {
    const containerRef = useRef(null);

    // Destructure universal animations
    const {animateIn, animateOut} = globalAnimations();

    // Run the page entrance animation

    const {contextSafe} = useGSAP(() => {
        gsap.timeline()
            // Hide Everything on Load
            .to([".planeSelectorSVG", ".backBtn", ".levelsBtn", ".tutorialBtn"], {autoAlpha:0, duration: 0}, 0)
            // Just Plane svg flies in from left
            .fromTo(".planeSelectorSVG", {autoAlpha:0, x: "-100vw" }, {autoAlpha:1, x: 0, duration: 1.5, ease: "power4.out"}, 0.5)
            // Buttons load one by one
            .fromTo([".backBtn", ".tutorialBtn", ".levelsBtn"], {autoAlpha:0, y: "10vw" }, {stagger: 0.2, autoAlpha:1, y: 0, duration: 0.5, ease: "power.in"})
    }, {scope: containerRef});


    // Button Mouse Enter and Leave
    const handleMouseEnter = contextSafe((e) => {
        const text= `.${e[0]}`;
        const svg = `.${e[1]}`;

        //context safe timeline, gsap cleans up automatically
        gsap.timeline()
            .to(text, { color: "#FFFFFF", scale: 1.1, duration: 0.5 })
            .to(svg, { color: "#FFFFFF", scale: 1.1, duration: 0.5 }, 0);
    });

    const handleMouseLeave = contextSafe((e) => {
        const text = `.${e[0]}`;
        const svg = `.${e[1]}`;

        // Animate them back to their original state smoothly
        gsap.timeline()
            .to(text, { color: "#3b3a3a", scale: 1, duration: 0.5 })
            .to(svg, { color: "#3b3a3a", scale: 1, duration: 0.5 }, 0);

    });


    const handleLevelsClick = contextSafe(() => {
        gsap.timeline()
            //Reserve Buttons
            .fromTo([".levelsBtn", ".tutorialBtn", ".backBtn"], {autoAlpha:1, y: 0 }, {stagger: 0.1, autoAlpha:0, y: "10vw", duration: 0.1, ease: "power.out"})

            // Plane flies back left
            .fromTo(".planeSelectorSVG", {autoAlpha:1, x:0 }, {autoAlpha:0, x: "100vw", duration: 0.5, ease: "power4.in"}, 0.25)

            // Hide Everything
            .to([".planeSelectorSVG", ".backBtn", ".levelsBtn", ".tutorialBtn"], {autoAlpha:0, duration: 0 ,
                onComplete: () => {onNavigate('Levels')}});
    });


    const handleTutorialClick = contextSafe(() => {
        gsap.timeline()
            //Reserve Buttons
            .fromTo([".levelsBtn", ".tutorialBtn", ".backBtn"], {autoAlpha:1, y: 0 }, {stagger: 0.1, autoAlpha:0, y: "10vw", duration: 0.1, ease: "power.out"})

            // Plane flies back left
            .fromTo(".planeSelectorSVG", {autoAlpha:1, x:0 }, {autoAlpha:0, x: "100vw", duration: 0.5, ease: "power4.in"}, 0.25)

            // Hide Everything
            .to([".planeSelectorSVG", ".backBtn", ".levelsBtn", ".tutorialBtn"], {autoAlpha:0, duration: 0 ,
                onComplete: () => {onNavigate('Tutorial')}});
    });



    const handleBackClick = contextSafe(() => {
            gsap.timeline()
                //Reserve Buttons
                .fromTo([".levelsBtn", ".tutorialBtn", ".backBtn"], {autoAlpha:1, y: 0 }, {stagger: 0.1, autoAlpha:0, y: "10vw", duration: 0.1, ease: "power.out"})

                // Plane flies back left
                .fromTo(".planeSelectorSVG", {autoAlpha:1, x:0 }, {autoAlpha:0, x: "-100vw", duration: 0.5, ease: "power4.in"}, 0.25)

                // Hide Everything
                .to([".planeSelectorSVG", ".backBtn", ".levelsBtn", ".tutorialBtn"], {autoAlpha:0, duration: 0 ,
                onComplete: () => {onNavigate('MainMenu')}});
    });





// Main Menu content
    return (
        <div ref={containerRef}
             className="w-full h-full bg-slate-900 relative"
             style={{containerType: 'size'}}
        >

            {/*Main Content Modal*/}
            <div className="absolute
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[90cqi] h-[90cqb]
            ">
                {/* Modal Container */}
                <div className="flex justify-between w-full h-full overflow-hidden relative">


                    {/* Plane Selector SVG*/}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[100cqmin] h-[100qmin]
                    planeSelectorSVG
                    "
                    >
                        {/*SVG Itself*/}
                        <PlaneSVG className="startPlaneSVG text-white"/>

                        {/*Options Parent Wrapper Container*/}
                        <div className="
                        w-[70cqmin] h-[100qmin]
                        absolute top-1/2 left-1/2 translate-x-[-45%] translate-y-[-60%]
                        flex items-center justify-center gap-[5cqmin] z-10">

                            {/*Back Button*/}
                            <div className="relative text-[#3b3a3a] backBtn"

                                 onMouseEnter={() => handleMouseEnter(["backText", "backShapeSVG"])}
                                 onMouseLeave={() => handleMouseLeave(["backText", "backShapeSVG"])}
                                 onClick={() => handleBackClick()}
                            >
                                <BackBtnSVG className="backShapeSVG w-[12cqmin] h-[12qmin]" style={{'--svg-fill': '#1ac90a', '--svg-shadow': '#198501'}}></BackBtnSVG>
                                <span className="flex items-center justify-center gap-[0.15em]
                                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                backText text-[3cqmin] font-mono font-bold w-max">

                                    <ReturnSVG className="shrink-0 backSVG w-[1em] h-[1em]"/>
                                    BACK
                                </span>
                            </div>

                            {/*Tutorial Button*/}
                            <div className="relative text-[#3b3a3a] tutorialBtn"

                                 onMouseEnter={() => handleMouseEnter(["tutorialText", "startShapeSVG2"])}
                                 onMouseLeave={() => handleMouseLeave(["tutorialText", "startShapeSVG2"])}
                                 onClick={() => handleTutorialClick()}
                            >
                                <StartBtnSvg className="startShapeSVG2" style={{'--svg-fill': '#1ac90a', '--svg-shadow': '#198501'}}></StartBtnSvg>
                                <span className="flex items-center justify-center gap-[0.3em]
                                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                tutorialText text-[3.2cqmin] font-mono font-bold w-max">

                                    <LearnSVG className="shrink-0 backSVG w-[1.2em] h-[1.2em]"/>
                                    TUTORIAL
                                </span>
                            </div>


                            {/*Levels Button*/}
                            <div className="relative text-[#3b3a3a] levelsBtn"

                                 onMouseEnter={() => handleMouseEnter(["levelsText", "startShapeSVG1"])}
                                 onMouseLeave={() => handleMouseLeave(["levelsText", "startShapeSVG1"])}
                                 onClick={() => handleLevelsClick()}
                            >
                                <StartBtnSvg className="startShapeSVG1" style={{'--svg-fill': '#1ac90a', '--svg-shadow': '#198501'}}></StartBtnSvg>
                                <span className="flex items-center justify-center gap-[0.3em]
                                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                levelsText text-[3.2cqmin] font-mono font-bold w-max">

                                    <LevelSVG className="shrink-0 backSVG w-[1.2em] h-[1.2em]"/>
                                    LEVELS
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StartMenu;
