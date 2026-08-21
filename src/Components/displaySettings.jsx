// This script handles text scaling because app scaled to 16:9 canvas and disabled scroll wheel zoom to make layout responsive
// This handles if user wants larger text anyway

const STORAGE_KEY = "sector33.display";
const PROPERTY = "--ui-scale";

export const TEXT_SCALE_MIN = 1;
export const TEXT_SCALE_MAX = 1.5;
export const TEXT_SCALE_STEP = 0.1;

const clamp = (value) =>
    Math.min(TEXT_SCALE_MAX, Math.max(TEXT_SCALE_MIN, Number(value) || TEXT_SCALE_MIN));

let textScale = TEXT_SCALE_MIN;

const apply = () => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty(PROPERTY, String(textScale));
};

export const getTextScale = () => textScale;

export const setTextScale = (value) => {
    textScale = clamp(value);
    apply();
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ textScale }));
    } catch {

    }
    return textScale;
};

// Call once at startup
export const loadDisplayPreferences = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        if (typeof saved.textScale === "number") textScale = clamp(saved.textScale);
    } catch {
        // Nothing stored, default
    }
    apply();
    return { textScale };
};
