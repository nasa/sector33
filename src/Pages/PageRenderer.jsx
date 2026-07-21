import React, { useState, useRef } from 'react';

import Tutorial from "/src/Pages/Tutorial.jsx";
import SplashScreen from "/src/Pages/SplashScreen.jsx";
import MainMenu from "/src/Pages/MainMenu.jsx";
import StartMenu from "/src/Pages/StartMenu.jsx";
import Levels from "/src/Pages/Levels.jsx";
import Stage from "/src/Pages/Stage.jsx";


const PageRenderer = () => {
    // activePage useState with default being SplashScreen
    const [activePage, setActivePage] = useState('SplashScreen');

    //Render Page switching function
    const renderPage = () => {
        if (activePage === 'SplashScreen') return <SplashScreen onNavigate={setActivePage} />;
        if (activePage === 'MainMenu') return <MainMenu onNavigate={setActivePage}/>;
        if (activePage === 'StartMenu') return <StartMenu onNavigate={setActivePage}/>;
        if (activePage === 'Tutorial') return <Tutorial onNavigate={setActivePage}/>;
        if (activePage === 'Levels') return <Levels onNavigate={setActivePage}/>;
        if (activePage === 'Stage') return <Stage onNavigate={setActivePage}/>;


    };

    return (
        // Viewport wrapper to center canvas on any window/screen size
        <div className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center select-none touch-none">
            {/*Canvas wrapper to use a 16:9 aspect ratio that scales between screen sizes marked as container*/}
            <div
                className="aspect-video w-full h-auto max-h-full max-w-full flex flex-col relative bg-slate-950 shadow-2xl @container">

                {/*All content to be displayed within these wrappers*/}
                {renderPage()}

            </div>
        </div>
    );
}
export default PageRenderer;



