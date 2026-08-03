import React, {useRef, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import {LEVELS_DATA} from "../Components/levelsData.jsx";
import {
    QuitBtnSVG,
    InfoSVG
} from '../../assets/resources/ButtonSVGs.jsx';
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {ExitSVG, PlaneSVG} from "../../assets/resources/IconSVGs.jsx";
import {IntroBanner, ReturnToMenuBtn} from "../Components/UIComponents.jsx";

const Levels = ({ onNavigate }) => {

    const containerRef = useRef(null);

    const {animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut} = globalAnimations();

    const {contextSafe} = useGSAP(() => {
        introBannerSlideInOut();
        animateIn();

    }, {scope: containerRef});

    const onFinish = contextSafe(() => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    });


    // Handle page exit sequence
    const menuPressed = () => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    };


    return (
        <div ref={containerRef}
             className="w-full h-full bg-slate-900 relative"
        >

            <ReturnToMenuBtn
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                menuPressed={menuPressed}
            />

            {/*Intro Banner SVG*/}
            <IntroBanner text="Select Your Level!" />



            {/*Levels Menu*/}
            <div className="levelsMenu fixed inset-0 h-screen overflow-hidden flex items-center justify-center fade-out">
                {/* Grid */}
                <div className="m-5 justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full max-w-7xl">
                    {LEVELS_DATA.map((level) => (
                        <div key={level.id} className="text-[#142857] rounded-lg shadow font-semibold text-center">
                            <div className={`group transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-1 relative flex h-80 w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 ${level.bgColor} ${level.borderColor}`}>
                                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center text-gray-700 shadow-none"
                                    style={{ backgroundImage: `url(${level.image})` }}>
                                    <div className="absolute inset-0 w-full h-full bg-linear-to-t from-black/80 via-black/50 to-black/10 flex items-end justify-center p-6">
                                        <h3 className="text-white text-2xl font-bold font-mono">
                                            {level.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

    export default Levels;





