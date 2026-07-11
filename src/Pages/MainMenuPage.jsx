import React, {useRef, useState} from 'react';
import { ReturnSVG, PlaneSVG, BookSVG, LevelSVG, ExitSVG, SettingsSVG, SoundSVG, DisplaySVG, ControlsSVG, AccessibilitySVG, ExtrasSVG, CreateSVG, HelpSVG, LearnSVG, FeedbackSVG } from "../../assets/resources/Icons.jsx";
import { StartBtnSvg, ExtrasBtnSVG, OptionsBtnSVG, BackBtnSVG, QuitBtnSVG } from '../../assets/resources/SVGs.jsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);


// Main Menu to start, quit, options, and extras
const MainMenuPage = () => {

    // Define Ref and useGSAP at top level of function so all children can access
    const containerRef = useRef(null);

    // use useGSAP when loading page, staging dependencies
    // use contextSafe when hovering or button clicking
    // no gsap when clicking buttons

    // setup hook and extract contextSafe
    const { contextSafe } = useGSAP(() => {

            // Runs when page loads
        gsap.timeline()
            .fromTo(
                ".slide-in",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out"}
            )
            .to( ".subMenu", { autoAlpha: 0, duration: 0},0)
            .to( ".startSubMenu", { autoAlpha: 0, duration: 0},0)

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
        // alert("startPressed");
        const start = `.${e[0]}`;
        const settings = `.${e[1]}`;
        const extra = `.${e[2]}`;
        const quit = `.${e[3]}`;

        //Fade out all other icons
        gsap.timeline()
            .to(start, { autoAlpha: 0, scale:5, x:200, y:200, duration: 0.5})
            .to(settings, { autoAlpha: 0, y:100, x:50, duration: 0.2 }, 0)
            .to(extra, { autoAlpha: 0, y:100, x:50, duration: 0.2 }, 0)
            .to(quit, { autoAlpha: 0, y:100, x:50, duration: 0.2 }, 0)
            .to( ".additional" , { autoAlpha: 0, y:100, x:50, duration: 0.2 }, 0)

            .to( ".subMenu" , { autoAlpha: 1, duration: 0 }, 0)
            .fromTo( ".startSubMenu" ,{ autoAlpha: 0, scale: 0.5, x:-380, y:-320}, { autoAlpha: 1, scale:2, x:0, y:0, duration: 2 }, 0)
        // Fade in Submenu Start

    })

    const optionsPressed = () => {
        alert("optionsPressed");
    }
    const extrasPressed = () => {
        alert("extrasPressed");
    }
    const quitPressed = () => {
        alert("If in window, close window, if in executable, close app.");
    }

    // Main Content
    return(
        <div ref={containerRef} className="bg-slate-900"> {/*Background to fade in and container ref*/}

            {/*SubMenu Layer*/}
            <div className="subMenu absolute inset-0 flex items-center justify-center z-10">

                {/*Start SubMenu*/}
                <div className="startSubMenu  w-[200px] h-[200px]  text-white">
                    <div className="w-full h-full">
                        <PlaneSVG/>
                    </div>
                </div>

            </div>

        {/*Main Background and layout*/}
        <div className=" flex min-h-screen w-full items-center justify-center bg-slate-900 slide-in">

            {/*White block in center, used for centering button elements around*/}
            <div className="flex relative w-[10vw] h-[10vh] rounded-xl justify-center items-center">

                {/*Image to be implemented*/}
                <img className="additional card absolute w-[50vw] h-[50vh] object-contain" src="/assets/images/sector33logo.png" alt="Sector 33 Logo" />

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
                        className= "absolute z-20
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
                        className= "absolute z-20
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
                        className= "absolute z-20
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
                        className= "absolute z-20
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



    )};

export default MainMenuPage;