import {SVGComponent1, SVGComponent2, SVGComponent3, SVGComponent4, SVGComponent5, SVGComponent6} from '../../assets/resources/PathSVGs.jsx';

export const tracks = {
    trackAlpha: {
        SvgComponent: SVGComponent2,
    },
    trackBeta: {
        SvgComponent: SVGComponent4,
    },
};


// Define initial setup for each track
export const startingConditions = {
    planeAlpha: {
        trackKey: "trackAlpha",
        planeId: ".plane-alpha",
        startPixel: "25_INIT_DESC",
        endPixel: "0_MOD",
        speed: 2.899,
        ease: "none",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
    planeBeta: {
        trackKey: "trackBeta",
        planeId: ".plane-beta",
        startPixel: "25_INIT_DESC",
        endPixel: "0_MOD",
        speed: 2.899,
        ease: "none",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
};

// Calculates pixel locations into GSAP MotionPath progress and calc travel timeline
export const calculateMotionPathProps = (planeConfig, trackSvgComponent, totalLength) => {
    const map = trackSvgComponent.breakpoints || {};
    const startValue = map[planeConfig.startPixel] || planeConfig.startPixel;
    const endValue = map[planeConfig.endPixel] || planeConfig.endPixel;

    const absoluteDistanceTraveled = Math.abs(endValue - startValue);

    const currentSpeed = planeConfig.speed || 2.899;

    const calcDuration = absoluteDistanceTraveled / currentSpeed;

    return {
        startProgress: startValue / totalLength,
        endProgress: endValue / totalLength,
        duration: calcDuration,
        ease: planeConfig.ease,
        autoRotate: planeConfig.autoRotate,
        alignOrigin: planeConfig.alignOrigin
    };
};

// Timeline acceleration param
const SPEED_MULTIPLIERS = [1,2,5,10];
let currentStepIndex = 0;

// Cycle the timeline speed using acc param
export const cycleTimelineSpeed = (timeline) => {
    if (!timeline) return;
    currentStepIndex = (currentStepIndex + 1) % SPEED_MULTIPLIERS.length;
    const nextScale = SPEED_MULTIPLIERS[currentStepIndex];
    timeline.timeScale(nextScale);
    return nextScale;
};

