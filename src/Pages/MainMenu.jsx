// This script houses the UI for the main menu
import {useRef} from 'react';
import { PlaneSVG, BookSVG, ExitSVG, SettingsSVG } from "../../assets/resources/IconSVGs.jsx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {ScrollingTicker, HdsButton} from "../Components/UIComponents.jsx";
import {MAIN_MENU_TICKER} from "../Components/tickerData.jsx";
import {playSound} from "../Components/soundEffects.jsx";
import sector33Logo from "../../assets/images/sector33logo.png";
gsap.registerPlugin(useGSAP);


const MainMenu = ({ onNavigate }) => {
    const containerRef = useRef(null);

    // Destructure universal animations
    const {animateIn, animateOut} = globalAnimations();

    // Run the page entrance animation
    useGSAP(() => {
        animateIn();
    }, {scope: containerRef});


    //Handle Button Clicks
    const handleStartClick = () => {
        playSound("buttonClick");
        animateOut(() => onNavigate('StartMenu'), '.fade-out');
    };

    const settingsPressed = () => {
        playSound("buttonClick");
        animateOut(() => onNavigate('SettingsMenu'), '.fade-out');
    };

    const extrasPressed = () => {
        playSound("buttonClick");
        animateOut(() => onNavigate('ExtrasMenu'), '.fade-out');
    };

    // Just exits to the splash screen not close browser
    const quitPressed = () => {
        playSound("back");
        animateOut(() => onNavigate('SplashScreen'), '.fade-out');
    };

// Main Menu content
    return (
        <div ref={containerRef}
             className="w-full h-full bg-carbon-90 relative"
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

                        <img className="object-cover" src={sector33Logo} alt="Main Menu Center Image">
                        </img>
                    </div>

                    {/*Start Button*/}
                    <div className="absolute slide-in-element
                    top-[2cqh] left-[2cqw]
                    w-[30cqmin]
                    startBtn
                    ">
                        <HdsButton
                            variant="cta"
                            Icon={PlaneSVG}
                            label="START"
                            size="2.6cqmin"
                            className="w-full"
                            onPress={handleStartClick}
                        />
                    </div>


                    {/*Settings Button*/}
                    <div className="absolute slide-in-element
                    top-[2cqh] right-[2cqw]
                    w-[30cqmin]
                    settingBtn
                    ">
                        <HdsButton
                            variant="secondary"
                            Icon={SettingsSVG}
                            label="SETTINGS"
                            size="2.6cqmin"
                            className="w-full"
                            onPress={settingsPressed}
                        />
                    </div>


                    {/*Extras Button*/}
                    <div className="absolute slide-in-element
                    bottom-[2cqh] right-[2cqw]
                    w-[30cqmin]
                    extrasBtn
                    ">
                        <HdsButton
                            variant="secondary"
                            Icon={BookSVG}
                            label="EXTRAS"
                            size="2.6cqmin"
                            className="w-full"
                            onPress={extrasPressed}
                        />
                    </div>


                    {/*Quit Button*/}
                    <div className="absolute slide-in-element
                    bottom-[2cqh] left-[2cqw]
                    w-[30cqmin]
                    quitBtn
                    ">
                        <HdsButton
                            variant="outline"
                            Icon={ExitSVG}
                            label="QUIT TO TITLE"
                            size="2.6cqmin"
                            className="w-full"
                            onPress={quitPressed}
                        />
                    </div>

                </div>
            </div>

            {/* Scrolling info text along the bottom, clear of the corner buttons */}
            <ScrollingTicker
                text={MAIN_MENU_TICKER}
                label="news ticker"
                className="slide-in-element fade-out absolute bottom-[1.5cqh] left-0 w-full
                font-hds-body text-[calc(1.5cqmin*var(--ui-scale,1))] text-carbon-40"
            />

        </div>
    );
}

export default MainMenu;
