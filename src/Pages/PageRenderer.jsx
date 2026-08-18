import React, { useState, useRef } from 'react';

import Tutorial from "/src/Pages/Tutorial.jsx";
import SplashScreen from "/src/Pages/SplashScreen.jsx";
import MainMenu from "/src/Pages/MainMenu.jsx";
import StartMenu from "/src/Pages/StartMenu.jsx";
import Levels from "/src/Pages/Levels.jsx";
import Stage from "/src/Pages/Stage.jsx";


const PageRenderer = () => {
    // activePage useState with default being SplashScreen
    const [activePage, setActivePage] = useState('Levels');
    const [activeLevelId, setActiveLevelId] = useState(1);

    // Pages call onNavigate(page) as before. Levels also passes a levelId so
    // Stage knows which level config to load.
    const handleNavigate = (page, levelId) => {
        if (levelId) setActiveLevelId(levelId);
        setActivePage(page);
    };

    //Render Page switching function
    const renderPage = () => {
        if (activePage === 'SplashScreen') return <SplashScreen onNavigate={handleNavigate} />;
        if (activePage === 'MainMenu') return <MainMenu onNavigate={handleNavigate}/>;
        if (activePage === 'StartMenu') return <StartMenu onNavigate={handleNavigate}/>;
        if (activePage === 'Tutorial') return <Tutorial onNavigate={handleNavigate}/>;
        if (activePage === 'Levels') return <Levels onNavigate={handleNavigate}/>;
        if (activePage === 'Stage') return <Stage onNavigate={handleNavigate} levelId={activeLevelId}/>;

    };


    return (
        // Viewport wrapper to center canvas on any window/screen size
        <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center select-none touch-none">
            {/*Canvas wrapper to use a 16:9 aspect ratio that scales between screen sizes marked as container*/}
            {/* Width is clamped to whatever 16:9 the window can fit, rather than
                w-full with a max-height. A max-height clamp lets the box end up wider
                than 16:9 on short windows, which changes the cqi to cqb ratio and
                shifts every container-unit position on the stage. */}
            <div
                className="aspect-video w-[min(100vw,177.778vh)] flex flex-col relative bg-slate-950 shadow-2xl @container">

                {/*All content to be displayed within these wrappers*/}
                {renderPage()}

            </div>
        </div>
    );
}
export default PageRenderer;



