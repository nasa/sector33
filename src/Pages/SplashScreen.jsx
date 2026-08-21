// This is the splash screen UI, text ticking on bottom within components

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { globalAnimations } from '../Components/globalAnimations.jsx';
import { ScrollingTicker } from '../Components/UIComponents.jsx';
import { SPLASH_TICKER } from '../Components/tickerData.jsx';
import nasaLogo from '../../assets/images/nasalogo.png';
import faaLogo from '../../assets/images/FAALOGO.png';
import sector33Logo from '../../assets/images/sector33logo.png';

const SplashScreen = ({ onNavigate }) => {
    const containerRef = useRef(null);

    // Destructure universal animations
    const { animateIn, animateOut } = globalAnimations();

    // Run the page entrance animation
    useGSAP(() => {
        animateIn();
    }, { scope: containerRef });

    // Handle page exit sequence
    const handleStartClick = () => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    };


    // Splash Screen content
    return (
        // Fills all of aspect ratio container not viewport
        <div ref={containerRef} className="w-full h-full bg-carbon-90 relative">
             {/*Button takes up entire space to wait for user click*/}
            <button
                onClick={handleStartClick}
                className="target w-full h-full bg-carbon-90 transition-colors fade-out flex flex-col justify-center items-center relative">

                {/* NASA Logo in top Right*/}
                <img
                    className="slide-in-element absolute top-[2cqh] left-[2cqw] w-[15cqw] h-[15cqh] object-contain object-top-left"
                    src={nasaLogo}
                    alt="Nasa Logo"
                />

                {/* FAA Logo in top Left*/}
                <img
                    className="slide-in-element absolute top-[2cqh] right-[2cqw] w-[15cqw] h-[15cqh] object-contain object-top-right"
                    src={faaLogo}
                    alt="FAA Logo"
                />

                {/* Flex Col to store logo and text wrt aspect ratio*/}
                <div className="flex flex-col justify-center items-center">
                    {/*Sector 33 Logo in Center*/}
                    <img
                        className="slide-in-element w-[50cqw] aspect-video object-contain"
                        src={sector33Logo}
                        alt="Logo"
                    />
                    {/* Text below in Center*/}

                    <h1 className="slide-in-element mt-[4cqh] text-[calc(2.5cqmin*var(--ui-scale,1))] font-hds-heading font-bold text-shadow-lg text-spacesuit-white">
                        Click Anywhere to Start
                    </h1>
                </div>

            </button>
            <div className="slide-in-element fade-out absolute bottom-[4cqh] left-0 w-full px-[2cqi]
                pointer-events-none
                font-hds-body text-[calc(1.6cqmin*var(--ui-scale,1))] text-carbon-40">
                <ScrollingTicker
                    text={SPLASH_TICKER}
                    label="welcome message"
                    buttonClassName="pointer-events-auto"
                />
            </div>
        </div>
    )
};

export default SplashScreen;
