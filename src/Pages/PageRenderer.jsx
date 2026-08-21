// This script is very important to the resizing of the window as it keeps it within the 16:9 aspect ratio for many screen sizes and responsiveness

import { useState, useRef, useEffect } from 'react';
import { preloadSounds, loadAudioPreferences } from "/src/Components/soundEffects.jsx";
import { loadDisplayPreferences } from "/src/Components/displaySettings.jsx";

import Tutorial from "/src/Pages/Tutorial.jsx";
import SplashScreen from "/src/Pages/SplashScreen.jsx";
import MainMenu from "/src/Pages/MainMenu.jsx";
import StartMenu from "/src/Pages/StartMenu.jsx";
import SettingsMenu from "/src/Pages/SettingsMenu.jsx";
import ExtrasMenu from "/src/Pages/ExtrasMenu.jsx";
import Levels from "/src/Pages/Levels.jsx";
import Stage from "/src/Pages/Stage.jsx";

const PAGE_TITLES = {
    SplashScreen: "Welcome",
    MainMenu: "Main menu",
    StartMenu: "Start",
    SettingsMenu: "Settings",
    ExtrasMenu: "Extras",
    Tutorial: "Tutorial",
    Levels: "Select a level",
    Stage: "Air traffic simulator"
};

const PageRenderer = () => {
    // activePage useState with default being SplashScreen
    const [activePage, setActivePage] = useState('SplashScreen');
    const [activeLevelId, setActiveLevelId] = useState(1);

    useEffect(() => {
        loadDisplayPreferences();
        loadAudioPreferences();
        preloadSounds();
    }, []);

    const handleNavigate = (page, levelId) => {
        if (levelId) setActiveLevelId(levelId);
        setActivePage(page);
    };

    const pageRef = useRef(null);
    const renderedPage = useRef(activePage);

    useEffect(() => {
        if (renderedPage.current === activePage) return;
        renderedPage.current = activePage;

        pageRef.current?.focus();
        document.title = `${PAGE_TITLES[activePage] || activePage} — Sector 33`;
    }, [activePage]);

    //Render Page switching function
    const renderPage = () => {
        if (activePage === 'SplashScreen') return <SplashScreen onNavigate={handleNavigate} />;
        if (activePage === 'MainMenu') return <MainMenu onNavigate={handleNavigate}/>;
        if (activePage === 'StartMenu') return <StartMenu onNavigate={handleNavigate}/>;
        if (activePage === 'SettingsMenu') return <SettingsMenu onNavigate={handleNavigate}/>;
        if (activePage === 'ExtrasMenu') return <ExtrasMenu onNavigate={handleNavigate}/>;
        if (activePage === 'Tutorial') return <Tutorial onNavigate={handleNavigate}/>;
        if (activePage === 'Levels') return <Levels onNavigate={handleNavigate}/>;
        if (activePage === 'Stage') return <Stage onNavigate={handleNavigate} levelId={activeLevelId}/>;
    };

    return (
        // Viewport wrapper to center canvas on any window/screen size
        <div className="w-screen h-screen overflow-hidden bg-carbon-black flex items-center justify-center select-none touch-none">
            <div
                ref={pageRef}
                tabIndex={-1}
                role="group"
                aria-label={PAGE_TITLES[activePage] || activePage}
                className="hds-palette-dark aspect-video w-[min(100vw,177.778vh)] flex flex-col relative bg-carbon-90 shadow-2xl @container focus:outline-none">

                {/*All content to be displayed within these wrappers*/}
                {renderPage()}

            </div>
        </div>
    );
}
export default PageRenderer;



