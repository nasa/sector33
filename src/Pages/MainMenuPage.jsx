import React, {useRef, useState} from 'react';
import { ReturnSVG, PlaneSVG, BookSVG, LevelSVG, ExitSVG, SettingsSVG, SoundSVG, DisplaySVG, ControlsSVG, AccessibilitySVG, ExtrasSVG, CreateSVG, HelpSVG, LearnSVG, FeedbackSVG } from "../../assets/resources/Icons.jsx";
import { StartBtnSvg, ExtrasBtnSVG, OptionsBtnSVG, BackBtnSVG, QuitBtnSVG } from '../../assets/resources/SVGs.jsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {LEVELS_DATA} from "../levelsData.jsx";
gsap.registerPlugin(useGSAP);



// Main Menu to start, quit, options, and extras
const MainMenuPage = () => {

    // Define Ref and useGSAP at top level of function so all children can access
    const containerRef = useRef(null);

    // setup hook and extract contextSafe
    const { contextSafe } = useGSAP(() => {

        // Runs when page loads
        gsap.timeline()
            .fromTo(
                ".slide-in",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out"}
            )
            .to( [".subMenu", ".levelsMenu" , ".startSubMenu" ], { autoAlpha: 0, duration: 0},0)

        }, { scope: containerRef });

    // Dynamic hover handlers using contextSafe
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
            .to(text, { color: "#777", scale: 1, duration: 0.5 })
            .to(svg, { color: "#777", scale: 1, duration: 0.5 }, 0);
    });

    // Buttons handlers when pressed
    const startPressed = contextSafe((e) => {
        gsap.timeline()
            .to(".additional", { autoAlpha: 0, scale: 0.5, x:0, y:0, duration: 0.1 },0)
            .to(".mainMenu", { autoAlpha: 0, scale: 5, x:0, y:0, duration: 0.5 },0)

            .to(".subMenu", { autoAlpha: 1, duration: 0 }, 0)

            .fromTo(".startSubMenu",
                { autoAlpha: 0, scale: 0.5, x: 0, y: 0 },
                { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: 0.75 }, 0
            );
    });

    const backPressed = contextSafe((e) => {
        const menu = `.${e[0]}`; // ".startSubMenu"

        gsap.timeline()
            // 1. Drop out the open submenu interface
            .to(menu, { autoAlpha: 0, x:-500, scale: 1, duration: 0.3 })
            .to(".subMenu", { autoAlpha: 0, duration: 0 })

            // 2. Bring back the main menu wrapper smoothly (Fixes pointer tracking issues)
            .to([".mainMenu",".additional"], {
                autoAlpha: 1,
                scale: 1,
                x: 0,
                y: 0,
                clearProps: "all",
                duration: 0.5
            });
    });

    const optionsPressed = () => {
        alert("optionsPressed");
    }
    const extrasPressed = () => {
        alert("extrasPressed");
    }
    const quitPressed = () => {
        // alert("If in window, close window, if in executable, close app.");
        window.close();
    }
    const tutorialPressed = () => {
        alert("START TUTORIAL");
    }

    const levelsPressed = contextSafe(() => {
        gsap.timeline()
            .to(".startSubMenu", { autoAlpha: 0, x:500, scale: 1, duration: 0.5 },0)
        // Show Levels grid
            .to(".levelsMenu", { autoAlpha: 1, duration: 0.5 },0)
    });



    // Main Content
    return(
        <div ref={containerRef} className=" h-screen overflow-hidden w-screen relative bg-slate-900"> {/*Background to fade in and container ref*/}

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


        {/*SubMenu Layer*/}
            <div className="subMenu absolute inset-0 flex items-center justify-center z-10">

                {/*Start SubMenu*/}
                <div className="startSubMenu text-white
                sm:w-100   sm:h-100
                md:w-125   md:h-125
                lg:w-150   lg:h-150
                xl:w-175   xl:h-175
                2xl:w-200  2xl:h-200
                ">
                    <div className=" flex w-full h-full">
                        <PlaneSVG/>
                        {/*Back Button*/}
                        <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    sm:w-18   sm:h-10    sm:mt-15 sm:-ml-1
                                    md:w-22   md:h-12    md:mt-20.5 md:-ml-1.75
                                    lg:w-28   lg:h-14    lg:mt-25 lg:-ml-2.25
                                    xl:w-34   xl:h-17    xl:mt-28 xl:-ml-3
                                    2xl:w-40   2xl:h-20    2xl:mt-31 2xl:-ml-3

                                    sm:text-md
                                    md:text-lg
                                    lg:text-xl
                                    xl:text-2xl
                                    2xl:text-4xl

                                    ">
                            <button className="relative"
                                    onMouseEnter={() => handleMouseEnter(["backText", "backSVG"])}
                                    onMouseLeave={() => handleMouseLeave(["backText", "backSVG"])}
                                    onClick={() => backPressed(["startSubMenu"])}
                            >
                                <BackBtnSVG className="text-[#777] backBtn" style={{'--svg-fill': '#3b82f6', '--svg-shadow': '#1e40af'}}> </BackBtnSVG>
                                <div className="absolute top-0 gap-1 flex items-center w-full h-full text-[#777]
                                    sm:p-1
                                    md:p-1.5
                                    lg:p-2
                                    xl:p-4
                                    2xl:p-3
                                ">
                                    <ReturnSVG className="text-[#777] backSVG"/>
                                    <span className="text-[#777] backText">BACK</span>

                                </div>
                            </button>
                        </div>

                        <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex  mb-3 justify-center gap-5
                            sm:w-67   sm:h-15
                            md:w-84   md:h-17.5
                            lg:w-105  lg:h-22.5   lg:pl-5
                            xl:w-125  xl:h-25     xl:mb-5
                            2xl:w-140 2xl:h-30    2xl:mb-5

                            sm:text-lg
                            md:text-2xl
                            lg:text-3xl
                            xl:text-4xl
                            2xl:text-4xl
                            ">
                                {/*Rest of Start Menu*/}
                            <button className="flex items-center w-full h-full bg-slate-900 rounded-md p-2 text-bold font-mono gap-2"
                                    onMouseEnter={() => handleMouseEnter(["tutorialText", "tutorialSVG"])}
                                    onMouseLeave={() => handleMouseLeave(["tutorialText", "tutorialSVG"])}
                                    onClick={() => tutorialPressed()}
                            >
                                <div className="
                                sm:w-10   sm:h-10
                                md:w-12   md:h-12
                                lg:w-15   lg:h-15
                                xl:w-20   xl:h-20
                                2xl:w-23  2xl:h-23
                                "
                                >
                                    <BookSVG className="text-[#777] tutorialSVG"/>
                                </div>
                                <span className="tutorialText text-[#777]"> TUTORIAL</span>

                           </button>
                                <button className="flex items-center w-full h-full bg-slate-900 rounded-md p-1 text-bold font-mono gap-2"
                                        onMouseEnter={() => handleMouseEnter(["levelsText", "levelsSVG"])}
                                        onMouseLeave={() => handleMouseLeave(["levelsText", "levelsSVG"])}
                                        onClick={() => levelsPressed()}
                                >
                                    <div className=" pl-1.5
                                    sm:w-10   sm:h-10
                                    md:w-12   md:h-12
                                    lg:w-15   lg:h-15
                                    xl:w-20   xl:h-20
                                    2xl:w-23  2xl:h-23
                                    ">
                                        <LevelSVG className="text-[#777] levelsSVG"/>
                                    </div>
                                    <span className="levelsText text-[#777]"> LEVELS</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        {/*Main Background and layout*/}
        <div className=" flex min-h-screen w-full items-center justify-center bg-slate-900 slide-in">

            {/*Additional wrapper for main menu*/}
            <div className="mainMenu absolute inset-0 flex items-center justify-center slide-in">

                {/*White block in center, used for centering button elements around*/}
            <div className="flex relative w-[10vw] h-[10vh] rounded-xl justify-center items-center">

                <div className=" additional card absolute
                sm:w-40     sm:h-30
                md:w-50     md:h-37.5
                lg:w-62.5   lg:h-47
                xl:w-78     xl:h-58.75
                2xl:w-97    2xl:h-73
                ">
                    <img className="" src="/assets/images/sector33logo.png" alt="">
                    </img>
                </div>


                {/*Start Button*/}
                <div className="absolute text-[#777] flex justify-center items-center startText

            {/*Fluid Typography and resizing based on window size using tailwind css breakpoints*/}
            sm:w-25      sm:h-25      sm:-left-35   sm:-top-25
            md:w-31.25   md:h-31.25   md:-left-45   md:-top-35
            lg:w-37.5    lg:h-37.5    lg:-left-55   lg:-top-45
            xl:w-43.75   xl:h-43.75   xl:-left-65   xl:-top-55
            2xl:w-50     2xl:h-50     2xl:-left-75  2xl:-top-65
            ">

                    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">

                        <div className="font-bold font-mono
                        sm:w-8.75  sm:h-8.75
                        md:w-11.25 md:h-11.25
                        lg:w-12.5  lg:h-12.5
                        xl:w-16.25 xl:h-16.25
                        2xl:w-17.5 2xl:h-17.5
                        ">
                            <PlaneSVG className="text-[#777] planeSVG"/>
                        </div>


                        <div className="font-bold font-mono
                        sm:text-lg
                        md:text-1xl
                        lg:text-2xl
                        xl:text-3xl
                        2xl:text-4xl
                        ">
                            START
                        </div>
                    </div>
                    <div className="flex flex-col">
                            <StartBtnSvg/>
                    </div>
                    <button
                        onMouseEnter={() => handleMouseEnter(["startText", "planeSVG"])}
                        onMouseLeave={() => handleMouseLeave(["startText", "planeSVG"])}
                        onClick={() => startPressed(["startText", "settingsText", "extrasText", "exitText"])}
                        className= "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        sm:w-25  sm:h-15
                        md:w-32 md:h-18
                        lg:w-38  lg:h-22
                        xl:w-44 xl:h-25
                        2xl:w-50 2xl:h-30
                        ">
                    </button>
                </div>

                {/*Settings Button*/}
                <div className="card absolute text-[#777] flex justify-center items-center settingsText
            sm:w-25      sm:h-25      sm:-right-35   sm:-top-25
            md:w-31.25   md:h-31.25   md:-right-45   md:-top-35
            lg:w-37.5    lg:h-37.5    lg:-right-55   lg:-top-45
            xl:w-43.75   xl:h-43.75   xl:-right-65   xl:-top-55
            2xl:w-50     2xl:h-50     2xl:-right-75   2xl:-top-65
            ">
                    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

                        <div className="font-bold font-mono
                        sm:w-7.5   sm:h-7.5
                        md:w-10    md:h-10
                        lg:w-12.5  lg:h-12.5
                        xl:w-13.75 xl:h-13.75
                        2xl:w-15   2xl:h-15
                        ">
                            <SettingsSVG className="text-[#777] settingsSVG" />
                        </div>
                        <div className="font-bold font-mono
                        sm:text-md
                        md:text-lg
                        lg:text-1xl
                        xl:text-2xl
                        2xl:text-3xl
                        pt-1
                        ">
                            SETTINGS
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <OptionsBtnSVG/>
                    </div>
                    <button
                        onMouseEnter={() => handleMouseEnter(["settingsText", "settingsSVG"])}
                        onMouseLeave={() => handleMouseLeave(["settingsText", "settingsSVG"])}
                        onClick={() => optionsPressed()}
                        className= "absolute
                        sm:w-25  sm:h-17
                        md:w-32 md:h-21
                        lg:w-38  lg:h-25
                        xl:w-44 xl:h-28
                        2xl:w-50 2xl:h-33
                        ">
                    </button>
                </div>

                {/*Extras Button*/}
                <div className="card absolute text-[#777] flex justify-center items-center extrasText
            sm:w-25      sm:h-25      sm:-right-35    sm:-bottom-25
            md:w-31.25   md:h-31.25   md:-right-45    md:-bottom-35
            lg:w-37.5    lg:h-37.5    lg:-right-55    lg:-bottom-45
            xl:w-43.75   xl:h-43.75   xl:-right-65    xl:-bottom-55
            2xl:w-50     2xl:h-50     2xl:-right-75   2xl:-bottom-65
            ">
                    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

                        <div className="font-bold font-mono
                        sm:w-7.5   sm:h-7.5
                        md:w-10    md:h-10
                        lg:w-12.5  lg:h-12.5
                        xl:w-13.75 xl:h-13.75
                        2xl:w-15   2xl:h-15
                        ">
                            <ExtrasSVG className="text-[#777] extrasSVG" />
                        </div>
                        <div className="font-bold font-mono  pb-0
                        sm:text-md  sm:pb-4
                        md:text-lg  md:pb-5
                        lg:text-1xl lg:pb-6
                        xl:text-2xl xl:pb-7
                        2xl:text-3xl 2xl:pb-8
                        ">
                            EXTRAS
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <ExtrasBtnSVG/>
                    </div>
                    <button
                        onMouseEnter={() => handleMouseEnter(["extrasText", "extrasSVG"])}
                        onMouseLeave={() => handleMouseLeave(["extrasText", "extrasSVG"])}
                        onClick={() => extrasPressed()}
                        className= "absolute
                        sm:w-25  sm:h-17
                        md:w-32 md:h-20
                        lg:w-38  lg:h-25
                        xl:w-44 xl:h-28
                        2xl:w-50 2xl:h-33
                        ">
                    </button>
                </div>

                {/*Exit Button*/}
                <div className="card absolute text-[#777] flex justify-center items-center exitText
            sm:w-17.5     sm:h-17.5    sm:-left-25   sm:-bottom-20
            md:w-23.75    md:h-23.75   md:-left-35   md:-bottom-30
            lg:w-30       lg:h-30      lg:-left-45   lg:-bottom-40
            xl:w-36.25    xl:h-36.25   xl:-left-55   xl:-bottom-50
            2xl:w-42.5    2xl:h-42.5   2xl:-left-65  2xl:-bottom-60
            ">
                    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

                        <div className="font-bold font-mono
                        sm:w-6.25   sm:h-6.25
                        md:w-8.75   md:h-8.75
                        lg:w-11.25  lg:h-11.25
                        xl:w-13.75  xl:h-13.75
                        2xl:w-15    2xl:h-15
                        ">
                            <ExitSVG className="text-[#777] exitSVG" />
                        </div>
                        <div className="font-bold font-mono
                        sm:text-sm
                        md:text-md
                        lg:text-1xl
                        xl:text-2xl
                        2xl:text-3xl
                        ">
                            EXIT
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <QuitBtnSVG/>
                    </div>
                    <button
                        onMouseEnter={() => handleMouseEnter(["exitText", "exitSVG"])}
                        onMouseLeave={() => handleMouseLeave(["exitText", "exitSVG"])}
                        onClick={() => quitPressed()}
                        className= "absolute
                        sm:w-18  sm:h-12
                        md:w-24 md:h-15
                        lg:w-30  lg:h-19
                        xl:w-37 xl:h-23
                        2xl:w-43 2xl:h-27
                        ">
                    </button>
                </div>
            </div>
        </div>
        </div>
        </div>



    )};

export default MainMenuPage;