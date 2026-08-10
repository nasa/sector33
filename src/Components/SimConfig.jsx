import {SVGComponent1, SVGComponent2, SVGComponent3, SVGComponent4, SVGComponent5, SVGComponent6} from '../../assets/resources/PathSVGs.jsx';

export const tracks = {
    track1: { SvgComponent: SVGComponent1, label: "1 - MOD direct" },
    track2: { SvgComponent: SVGComponent2, label: "2 - via OAL" },
    track3: { SvgComponent: SVGComponent3, label: "3 - LIDAT direct" },
    track4: { SvgComponent: SVGComponent4, label: "4 - LIDAT via OAL" },
    track5: { SvgComponent: SVGComponent5, label: "5 - TPH climb" },
    track6: { SvgComponent: SVGComponent6, label: "6 - level" },
};

export const DEFAULT_SPEED = 2.899;
// Define initial setup for each track
export const startingConditions = {
    planeAlpha: {
        trackKey: "track2",
        switchableTracks: ["track2", "track1"],
        planeId: ".plane-alpha",
        startPixel: "25_INIT_DESC",
        endPixel: "0_MOD",
        speed: DEFAULT_SPEED,
        ease: "none",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
    planeBeta: {
        trackKey: "track4",
        switchableTracks: ["track4", "track3"],
        planeId: ".plane-beta",
        startPixel: "25_INIT_DESC",
        endPixel: "0_MOD",
        speed: DEFAULT_SPEED,
        ease: "none",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
    planeGamma: {
        trackKey: "track5",
        planeId: ".plane-gamma",
        startPixel: "30_INIT_DESC",
        endPixel: "0_MOD",
        speed: DEFAULT_SPEED,
        ease: "none",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
};

// Turn a startPixel/endPixel config value into a number. Accepts either a
// waypoint name from the track's breakpoints map ("25_INIT_DESC") or a raw px
// number, so a config can be written either way.
export const resolvePixel = (breakpoints, value) => {
    const mapped = breakpoints?.[value];
    if (typeof mapped === "number") return mapped;
    return typeof value === "number" ? value : Number(value) || 0;
};




// Calculates pixel locations into GSAP MotionPath progress and calc travel timeline
export const calculateMotionPathProps = (planeConfig, trackSvgComponent, totalLength) => {
    const map = trackSvgComponent.breakpoints || {};
    const startValue = resolvePixel(map, planeConfig.startPixel);
    const endValue = resolvePixel(map, planeConfig.endPixel);

    const absoluteDistanceTraveled = Math.abs(endValue - startValue);

    const currentSpeed = planeConfig.speed || DEFAULT_SPEED;

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

// Reset the acceleration cycle back to 1x, so a sim reset does not leave the
// button label and the actual timeScale out of step.
export const resetTimelineSpeed = (timeline) => {
    currentStepIndex = 0;
    if (timeline) timeline.timeScale(1);
    return SPEED_MULTIPLIERS[0];
};
