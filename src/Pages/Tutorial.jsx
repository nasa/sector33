// This script handles the display and UI of the tutorial, actual text data elsewhere
import {useRef, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import {Tutorial_Data} from "../Components/tutorialData.jsx";
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {IntroBanner, ReturnToMenuBtn, HdsButton} from "../Components/UIComponents.jsx";
import {playSound} from "../Components/soundEffects.jsx";

const Tutorial = ({ onNavigate }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = Tutorial_Data.length;
    const currentData = Tutorial_Data[currentStep];
    const handleBack = () => {
        if (currentStep > 0) {
            playSound("nextPrev");
            setCurrentStep(currentStep - 1);
        }
    };
    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            playSound("nextPrev");
            setCurrentStep(currentStep + 1);
        }
        if (currentStep === (totalSteps - 1)) {
            onFinish();
        }
    };

    const containerRef = useRef(null);
    const {animateIn, animateOut, introBannerSlideInOut} = globalAnimations();

    // Run on Start
    const {contextSafe} = useGSAP(() => {
        introBannerSlideInOut();
        animateIn();
    }, {scope: containerRef});

    // Handle page exit sequence
    const onFinish = contextSafe(() => {
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    });

    const menuPressed = () => {
        playSound("back");
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    };

    return (
        <div ref={containerRef}
             className="w-full h-full bg-carbon-90 relative"
        >
            <ReturnToMenuBtn
                menuPressed={menuPressed}
            />

            {/*Intro Banner SVG*/}
            <IntroBanner text="Welcome to the Tutorial!" />


                {/*Main Content Modal*/}
                <div className="absolute slide-in fade-out
                top-1/2 left-1/2
                p-[2cqmin] overflow-y-auto
                w-[70cqmin] h-[60cqmin]
                ">
                    {/* Modal Container */}
                    <div className="flex flex-col justify-between rounded-[2cqmin] bg-carbon-90 border border-carbon-80 w-full h-full p-[4cqmin] shadow-2xl overflow-hidden">

                        {/* Steps Indicator & Header */}
                        <div className="space-y-[1cqmin]">
                            <div className="flex items-center justify-between">
                                {/* Step Counter */}
                                <span
                                    className="text-[calc(1.2cqmin*var(--ui-scale,1))] font-hds-mono font-bold text-carbon-40 uppercase tracking-widest">
                        Step {currentStep + 1} of {totalSteps}
                        </span>

                            </div>

                            {/* Title*/}
                            <h2 className="text-carbon-10 font-bold font-hds-heading text-[calc(3cqmin*var(--ui-scale,1))]">
                                {currentData.title}
                            </h2>
                        </div>

                        {/* Description & Tips */}
                        <div className="flex-1 my-[1.5cqmin] flex flex-col justify-center space-y-[1.5cqmin]">
                            {/* Main Body */}
                            <p className="text-carbon-30 font-hds-body leading-relaxed text-[calc(1.8cqmin*var(--ui-scale,1))]">
                                {currentData.desc}
                                <br></br>
                                <br></br>
                                {currentData.desc2}

                            </p>

                            {/* Optional Highlight/Tip Box */}
                            <div className="p-[1cqmin] rounded-[0.8cqmin] bg-carbon-90/60 border border-carbon-80/80">
                                <p className="text-carbon-30 font-hds-body text-[calc(1.3cqmin*var(--ui-scale,1))]">
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
                                        className={`h-[0.3cqmin] flex-1 rounded-full transition-colors duration-300  ${index <= currentStep ? "bg-nasa-blue" : "bg-carbon-80"}`}/>))}</div>

                            {/* Navigation Row */}
                            <div className="flex justify-between items-center font-hds-heading text-[calc(1.5cqmin*var(--ui-scale,1))]">
                                {/* Back Button (Disabled on step 1) */}
                                <HdsButton
                                    variant="outline"
                                    label="< Back"
                                    size="1.5cqmin"
                                    disabled={currentStep === 0}
                                    onPress={handleBack}
                                />

                                {/* Step Counter Tracker */}
                                <div className="hidden sm:block text-carbon-50 font-hds-mono text-[calc(1.1cqmin*var(--ui-scale,1))]">
                                    {currentStep + 1} / {totalSteps}
                                </div>

                                {/* Next / Finish Button */}
                                <HdsButton
                                    variant="secondary"
                                    label={currentStep === totalSteps - 1 ? "Finish" : "Next >"}
                                    size="1.5cqmin"
                                    onPress={handleNext}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
    );
}

    export default Tutorial;





