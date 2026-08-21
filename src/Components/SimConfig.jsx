// This script takes all the paths and displays them on the screen
import {SVGComponent1, SVGComponent2, SVGComponent3, SVGComponent4, SVGComponent5, SVGComponent6} from '../../assets/resources/PathSVGs.jsx';

export const tracks = {
    track1: { SvgComponent: SVGComponent1, label: "1 - MOD direct" },
    track2: { SvgComponent: SVGComponent2, label: "2 - via OAL" },
    track3: { SvgComponent: SVGComponent3, label: "3 - LIDAT direct" },
    track4: { SvgComponent: SVGComponent4, label: "4 - LIDAT via OAL" },
    track5: { SvgComponent: SVGComponent5, label: "5 - TPH climb" },
    track6: { SvgComponent: SVGComponent6, label: "6 - level" },
};

// Calculated from knots per second from old sim
export const DEFAULT_SPEED = 2.899;

// in case color not defined so doesn't break
export const DEFAULT_PLANE_COLOR = "FFFFFF";

// Standard readable text for accessibility
export const readableTextOn = (hex) => {
    const clean = String(hex).replace("#", "");
    if (clean.length !== 6) return "#ffffff";

    const channel = (offset) => {
        const value = parseInt(clean.slice(offset, offset + 2), 16) / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);

    const againstWhite = 1.05 / (luminance + 0.05);
    const againstBlack = (luminance + 0.05) / (0.0114 + 0.05);
    return againstBlack >= againstWhite ? "#16161a" : "#ffffff";
};

// Pixels per tick
export const TICK_PX = 17.34;


// Turns the mapped names into a pixel value (i.e. 25_INIT_DESC+2 = pixels) for easy level building and readability during debugging
export const resolvePixel = (breakpoints, value) => {
    if (typeof value === "number") return value;

    const mapped = breakpoints?.[value];
    if (typeof mapped === "number") return mapped;

    // In case + is within the string
    const offset = typeof value === "string" ? value.match(/^(.+?)\s*([+-])\s*([\d.]+)$/) : null;
    if (offset) {
        const base = breakpoints?.[offset[1]];
        if (typeof base === "number") {
            return base + (offset[2] === "-" ? -1 : 1) * Number(offset[3]) * TICK_PX;
        }
    }

    // In case not a number
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
        if (import.meta.env.DEV) {
            console.warn(
                `[waypoint] "${value}" is not a known waypoint and has no numeric value; ` +
                `falling back to 0, the end of the track. Known: ${Object.keys(breakpoints || {}).join(", ")}`
            );
        }
        return 0;
    }

    return numeric || 0;
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

// Reset the acceleration cycle back to 1x, so a sim reset does not leave the button label and the actual timeScale out of step
export const resetTimelineSpeed = (timeline) => {
    currentStepIndex = 0;
    if (timeline) timeline.timeScale(1);
    return SPEED_MULTIPLIERS[0];
};
