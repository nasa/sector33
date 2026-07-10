import MainMenuPage from "./Pages/MainMenuPage.jsx";
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

// Switch between Splash screen and Main Menu
const MenuManager = () => {
    const [activePage, setActivePage] = useState('SplashScreen');

    // Choose which to render
    const renderPage = () => {
        if (activePage === 'SplashScreen') return <SplashScreen onNavigate={setActivePage} />;
        if (activePage === 'about') return <MainMenuPage />;
    };

    // Renderer
    return (
        <div className="">
            <div className="">
                {renderPage()}
            </div>
        </div>
    );
}

// Splash Screen
const SplashScreen = ({ onNavigate }) => {

    // reference for gsap animation
    const containerRef = useRef(null);

    // context safe for gsap, all useGSAP goes here in the SplashScreen
    const { contextSafe } =

        // All elements slide into screen from no opacity
        useGSAP(() => {
        gsap.fromTo(
            ".slide-in",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out"}
        );
    }, { scope: containerRef });

    // All elements fade out screen to no opacity and go to Main Menu
    const handleStartClick = contextSafe(() => {
        gsap.to(".fade-out", {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                onNavigate('about');
            }
        });
    });

    // Splash Screen content
    return (
        <div ref={containerRef} className="bg-slate-900">
        <button
            onClick={handleStartClick}
            className="target w-screen h-screen bg-slate-900 transition-colors fade-out">
            <img className="slide-in absolute top-0 right-0  w-[20vw] h-[20vh] object-contain " src="/assets/images/nasalogo.png" alt="Nasa Logo" />
            <div className="flex flex-col justify-center items-center rounded-xl">
                <img className=" slide-in w-[50vw] h-[50vh] object-contain" src="/assets/images/sector33logo.png" alt="Sector 33 Logo" />
                <h1 className="slide-in mt-10 text-l sm:text-xl md:text-2xl lg:text-3xl font-mono font-bold text-shadow-lg text-emerald-400">
                    Click Anywhere to Start
                </h1>
            </div>
        </button>
        </div>
    );
}

export default MenuManager;