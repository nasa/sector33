import React, {useRef, useState} from 'react';
import { ReturnSVG, PlaneSVG, BookSVG, LevelSVG, ExitSVG, SettingsSVG, SoundSVG, DisplaySVG, ControlsSVG, AccessibilitySVG, ExtrasSVG, CreateSVG, HelpSVG, LearnSVG, FeedbackSVG } from "../../assets/resources/IconSVGs.jsx";
import {
    StartBtnSvg,
    ExtrasBtnSVG,
    SettingsBtnSVG,
    BackBtnSVG,
    QuitBtnSVG,
    InfoSVG
} from '../../assets/resources/ButtonSVGs.jsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {globalAnimations} from "../Components/globalAnimations.jsx";
gsap.registerPlugin(useGSAP);


const MainMenu = ({ onNavigate }) => {
    const containerRef = useRef(null);

    // Destructure universal animations
    const {animateIn, animateOut, handleMouseEnter, handleMouseLeave} = globalAnimations();

    // Run the page entrance animation
    const {contextSafe} = useGSAP(() => {
        animateIn();
    }, {scope: containerRef});


    //Handle Button Clicks
    const handleStartClick = () => {
        animateOut(() => onNavigate('StartMenu'), '.fade-out');
    };

    const settingsPressed = () => {
        alert("settings");
    }

    const extrasPressed = () => {
        alert("options");
    }

    const quitPressed = () => {
        alert("If in window, close window, if in executable, close app.");
        window.close();
    }

// Main Menu content
    return (
        <div ref={containerRef}
             className="w-full h-full bg-slate-900 relative"
        >

            {/*Main Content Modal*/}
            <div className="absolute fade-out
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[80cqi] h-[80cqb]
            ">
                {/* Modal Container */}
                <div
                    className="flex flex-col justify-between w-full h-full overflow-hidden relative">
                    {/* Main Menu Content */}


                    {/*Main Menu Image*/}
                    <div className="absolute slide-in-element
                    top-[25cqh] left-[25cqw]
                    w-[50cqmin] h-[23cqmin]">

                        <img className="object-cover" src="/assets/images/sector33logo.png" alt="Main Menu Center Image">
                        </img>
                    </div>


                    {/*Start Button*/}
                    <div className="absolute slide-in-element
                    top-[2cqh] left-[2cqw]
                    w-[30cqmin] h-[23qmin]
                    startBtn
                    "
                         onMouseEnter={() => handleMouseEnter(".startText", ".startPlaneSVG", ".startShapeSVG")}
                         onMouseLeave={() => handleMouseLeave(".startText", ".startPlaneSVG", ".startShapeSVG")}
                         onClick={() => handleStartClick()}
                    >

                        {/*Parent Wrapper Container for Start*/}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[1cqmin] z-10 text-[#3b3a3a]">
                            <PlaneSVG className="startPlaneSVG w-[10cqmin] h-[10cqmin]"/>
                            <span className="startText text-[3cqmin] font-mono font-bold">
                                START
                            </span>
                        </div>

                        <StartBtnSvg className="startShapeSVG" style={{'--svg-fill': '#1ac90a', '--svg-shadow': '#198501'}}></StartBtnSvg>
                    </div>



                    {/*Settings Button*/}
                    <div className="absolute slide-in-element
                    top-[2cqh] right-[2cqw]
                    w-[30cqmin] h-[23qmin]
                    settingBtn
                    "
                         onMouseEnter={() => handleMouseEnter(".settingsText", ".settingsGearSVG", ".settingsShapeSVG")}
                         onMouseLeave={() => handleMouseLeave(".settingsText", ".settingsGearSVG", ".settingsShapeSVG")}
                         onClick={() => settingsPressed()}
                    >
                        {/*Parent Wrapper Container for Start*/}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[1cqmin] z-10 text-[#3b3a3a]">
                            <SettingsSVG className="settingsGearSVG w-[10cqmin] h-[10cqmin]"/>
                            <span className="settingsText text-[3cqmin] font-mono font-bold">
                                SETTINGS
                            </span>
                        </div>

                        <SettingsBtnSVG className="settingsShapeSVG" style={{'--svg-fill': '#f0a150', '--svg-shadow': '#f09537'}}></SettingsBtnSVG>
                    </div>


                    {/*Extras Button*/}
                    <div className="absolute slide-in-element
                    bottom-[2cqh] right-[2cqw]
                    w-[30cqmin] h-[23qmin]
                    extrasBtn
                    "
                         onMouseEnter={() => handleMouseEnter(".extrasText", ".extrasBoxSVG", ".extrasShapeSVG")}
                         onMouseLeave={() => handleMouseLeave(".extrasText", ".extrasBoxSVG", ".extrasShapeSVG")}
                         onClick={() => extrasPressed()}
                    >

                        {/*Parent Wrapper Container for Start*/}
                        <div className="absolute inset-0 flex flex-col -translate-y-3 items-center justify-center gap-[1cqmin] z-10 text-[#3b3a3a]">
                            <BookSVG className="extrasBoxSVG w-[8cqmin] h-[8cqmin]"/>
                            <span className="extrasText text-[3cqmin] font-mono font-bold">
                                EXTRAS
                            </span>
                        </div>

                        <ExtrasBtnSVG className="extrasShapeSVG" style={{'--svg-fill': '#6497b1', '--svg-shadow': '#03396c'}}></ExtrasBtnSVG>
                    </div>


                    {/*Quit Button*/}
                    <button className="absolute slide-in-element
                    bottom-[5cqh] left-[5cqw]
                    w-[20cqmin] h-[23qmin]
                    quitBtn
                    "
                            onMouseEnter={() => handleMouseEnter(".quitText", ".quitDoorSVG", ".quitShapeSVG")}
                            onMouseLeave={() => handleMouseLeave(".quitText", ".quitDoorSVG", ".quitShapeSVG")}
                            onClick={() => quitPressed()}
                    >

                        {/*Parent Wrapper Container for Start*/}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[1cqmin] z-10 text-[#3b3a3a]">
                            <ExitSVG className="quitDoorSVG w-[8cqmin] h-[8cqmin]"/>
                            <span className="quitText text-[3cqmin] font-mono font-bold">
                                EXIT
                            </span>
                        </div>

                        <QuitBtnSVG className="quitShapeSVG" style={{'--svg-fill': '#684c6b', '--svg-shadow': '#332438'}}></QuitBtnSVG>
                    </button>

                </div>
            </div>

        </div>
    );
}

export default MainMenu;
