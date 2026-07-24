import React, {useRef, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import {
    QuitBtnSVG,
    InfoSVG
} from '../../assets/resources/ButtonSVGs.jsx';
import {Tutorial_Data} from "../Components/tutorialData.jsx";
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {ExitSVG} from "../../assets/resources/IconSVGs.jsx";
import {IntroBanner, ReturnToMenuBtn} from "../Components/UIComponents.jsx";

const Tutorial = ({ onNavigate }) => {

    // Tutorial Specific JS
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = Tutorial_Data.length;
    const currentData = Tutorial_Data[currentStep];
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
        if (currentStep === (totalSteps - 1)) {
            onFinish();
        }
    };


    const containerRef = useRef(null);

    const {animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut} = globalAnimations();


    // Run on Start
    const {contextSafe} = useGSAP(() => {
        introBannerSlideInOut();
        animateIn('.slide-in');
    }, {scope: containerRef});


    // Handle page exit sequence
    const onFinish = contextSafe(() => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    });

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
            <IntroBanner text="Welcome to the Tutorial!" />


                {/*Main Content Modal*/}
                <div className="absolute slide-in fade-out
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                p-[2cqmin] overflow-y-auto
                w-[70cqmin] h-[60cqmin]
                ">
                    {/* Modal Container */}
                    <div className="flex flex-col justify-between rounded-[2cqmin] bg-slate-950 border border-slate-800 w-full h-full p-[4cqmin] shadow-2xl overflow-hidden">

                        {/* Steps Indicator & Header */}
                        <div className="space-y-[1cqmin]">
                            <div className="flex items-center justify-between">
                                {/* Step Counter */}
                                <span
                                    className="text-[1.2cqmin] font-mono font-bold text-emerald-500 uppercase tracking-widest">
                        Step {currentStep + 1} of {totalSteps}
                        </span>

                            </div>

                            {/* Title*/}
                            <h2 className="text-slate-100 font-bold font-mono text-[3cqmin]">
                                {currentData.title}
                            </h2>
                        </div>

                        {/* Description & Tips */}
                        <div className="flex-1 my-[1.5cqmin] flex flex-col justify-center space-y-[1.5cqmin]">
                            {/* Main Body */}
                            <p className="text-slate-300 font-sans leading-relaxed text-[1.8cqmin]">
                                {currentData.desc}
                                <br></br>
                                <br></br>
                                {currentData.desc2}

                            </p>

                            {/* Optional Highlight/Tip Box */}
                            <div className="p-[1cqmin] rounded-[0.8cqmin] bg-slate-950/60 border border-slate-800/80">
                                <p className="text-emerald-400/90 font-mono text-[1.3cqmin]">
                                    {currentData.tip}
                                </p>
                            </div>
                        </div>

                        {/* BOTTOM SECTION */}
                        <div className="space-y-[2cqmin]">
                            {/* Dynamic Progress Bar Segments */}
                            <div className="flex gap-[0.5cqmin] w-full">
                                {Tutorial_Data.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-[0.3cqmin] flex-1 rounded-full transition-colors duration-300  ${index <= currentStep ? "bg-emerald-400" : "bg-slate-800"}`}/>))}</div>

                            {/* Navigation Row */}
                            <div className="flex justify-between items-center font-mono text-[1.5cqmin]">
                                {/* Back Button (Disabled on step 1) */}
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className={`px-[2cqmin] py-[1cqmin] rounded-[0.8cqmin] border transition-all duration-200 cursor-pointer ${
                                        currentStep === 0
                                            ? "border-slate-850 text-slate-700 opacity-50 cursor-not-allowed"
                                            : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                                >
                                    &lt; Back
                                </button>

                                {/* Step Counter Tracker */}
                                <div className="hidden sm:block text-slate-500 font-mono text-[1.1cqmin]">
                                    {currentStep + 1} / {totalSteps}
                                </div>

                                {/* Next / Finish Button */}
                                <button
                                    onClick={handleNext}
                                    className="px-[2cqmin] py-[1cqmin] rounded-[0.8cqmin] bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-950/20"
                                >
                                    {currentStep === totalSteps - 1 ? "Finish" : "Next >"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
    );
}

    export default Tutorial;





