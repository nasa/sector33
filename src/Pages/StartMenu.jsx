// This script is pure react UI components and has the start menu options

import {useRef} from 'react';
import { ReturnSVG, PlaneSVG, LevelSVG, LearnSVG } from "../../assets/resources/IconSVGs.jsx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {HdsButton} from "../Components/UIComponents.jsx";
import {playSound} from "../Components/soundEffects.jsx";
gsap.registerPlugin(useGSAP);


const StartMenu = ({ onNavigate }) => {
    const containerRef = useRef(null);
    const SHAPE = ".planeSelectorSVG";
    const OPTION_BUTTONS = [".backBtn", ".tutorialBtn", ".levelsBtn"];

    // Destructure universal animations
    const {selectorMenuIn, selectorMenuOut} = globalAnimations();

    // Run the page entrance animation
    useGSAP(() => {
        selectorMenuIn(SHAPE, OPTION_BUTTONS);
    }, {scope: containerRef});

    // Send plane off to the right, back send it left
    const handleLevelsClick = () => {
        playSound("buttonClick");
        selectorMenuOut(SHAPE, OPTION_BUTTONS, "100vw", () => onNavigate('Levels'));
    };

    const handleTutorialClick = () => {
        playSound("buttonClick");
        selectorMenuOut(SHAPE, OPTION_BUTTONS, "100vw", () => onNavigate('Tutorial'));
    };

    const handleBackClick = () => {
        playSound("back");
        selectorMenuOut(SHAPE, OPTION_BUTTONS, "-100vw", () => onNavigate('MainMenu'));
    };

// Main Start Menu content
    return (
        <div ref={containerRef}
             className="w-full h-full bg-carbon-90 relative"
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
                        <PlaneSVG className="startPlaneSVG text-spacesuit-white"/>

                        {/*Options Parent Wrapper Container*/}
                        <div className="
                        w-[70cqmin] h-[100qmin]
                        absolute top-1/2 left-1/2 translate-x-[-45%] translate-y-[-60%]
                        flex items-center justify-center gap-[5cqmin] z-10">

                            {/*Back Button*/}
                            <div className="backBtn">
                                <HdsButton
                                    variant="outline"
                                    className="hds-btn-on-art"
                                    Icon={ReturnSVG}
                                    label="BACK"
                                    size="2.4cqmin"
                                    onPress={handleBackClick}
                                />
                            </div>

                            {/*Tutorial Button*/}
                            <div className="tutorialBtn">
                                <HdsButton
                                    variant="secondary"
                                    Icon={LearnSVG}
                                    label="TUTORIAL"
                                    size="2.4cqmin"
                                    onPress={handleTutorialClick}
                                />
                            </div>


                            {/*Levels Button*/}
                            <div className="levelsBtn">
                                <HdsButton
                                    variant="cta"
                                    Icon={LevelSVG}
                                    label="LEVELS"
                                    size="2.4cqmin"
                                    onPress={handleLevelsClick}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StartMenu;
