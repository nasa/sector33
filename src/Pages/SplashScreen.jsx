import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { globalAnimations } from '../Components/globalAnimations.jsx';

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
        <div ref={containerRef} className="w-full h-full bg-slate-900 relative">
             {/*Button takes up entire space to wait for user click*/}
            <button
                onClick={handleStartClick}
                className="target w-full h-full bg-slate-900 transition-colors fade-out flex flex-col justify-center items-center relative">

                {/* NASA Logo in top Right*/}
                <img
                    className="slide-in-element absolute top-[1cqh] right-[1cqw] w-[15cqw] h-[15cqh] object-contain object-top-right"
                    src="/assets/images/NasaLogo.png"
                    alt="Nasa Logo"
                />

                {/* FAA Logo in top Left*/}
                <img
                    className="slide-in-element absolute top-[1cqh] left-[1cqw] w-[15cqw] h-[15cqh] object-contain object-top-left"
                    src="/assets/images/FAALOGO.png"
                    alt="FAA Logo"
                />

                {/* Flex Col to store logo and text wrt aspect ratio*/}
                <div className="flex flex-col justify-center items-center">
                    {/*Sector 33 Logo in Center*/}
                    <img
                        className="slide-in-element w-[50cqw] aspect-video object-contain"
                        src="/assets/images/sector33logo.png"
                        alt="Logo"
                    />
                    {/* Text below in Center*/}

                    <h1 className="slide-in-element mt-[4cqh] text-[2.5cqmin] font-mono font-bold text-shadow-lg text-emerald-400">
                        Click Anywhere to Start
                    </h1>
                </div>
            </button>
        </div>
    )
};

export default SplashScreen;


