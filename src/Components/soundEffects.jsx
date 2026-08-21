// This script is to play the sound effects for the app

// NOTE: Currently this feature in development but turned off for this release

// Vite resolves this at build time into a map of path -> final URL
const AUDIO_FILES = import.meta.glob("../../assets/audio/*", {
    eager: true,
    query: "?url",
    import: "default"
});

const fileUrl = (fileName) => AUDIO_FILES[`../../assets/audio/${fileName}`];

// Sound files read from /audio
export const SOUND_FILES = {
    // Menus and navigation
    hover:              { file: "Hover.mp3",              volume: 0.10 },
    buttonClick:        { file: "ButtonClick.mp3",        volume: 0.55 },
    back:               { file: "BackButton.mp3",         volume: 0.45 },
    nextPrev:           { file: "NextPrev.mp3",           volume: 0.5 },
    cantClick:          { file: "CantClick.mp3",          volume: 0.45 },

    // Stage transport controls
    play:               { file: "Play.mp3",               volume: 0.45 },
    pause:              { file: "Pause.mp3",              volume: 0.45 },
    restart:            { file: "Restart.mp3",            volume: 0.45 },
    speedChange:        { file: "SpeedChange.mp3",        volume: 0.45 },
    skip30:             { file: "Skip30.mp3",             volume: 0.45 },
    switchSpeed:        { file: "SwitchSpeed.mp3",        volume: 0.45 },

    // Stage gameplay
    selectPlane:        { file: "SelectPlane.mp3",        volume: 0.50 },
    trackSwitch:        { file: "TrackSwitch.mp3",        volume: 0.55 },
    planesTooClose:     { file: "PlanesTooClose.mp3",     volume: 0.60 },

    // Level outcomes
    successBestTime:    { file: "SuccessBestTime.mp3",    volume: 0.70 },
    successNotBestTime: { file: "SuccessNotBestTime.mp3", volume: 0.70 },
    fail:               { file: "Fail.mp3",               volume: 0.70 }
};

// In this build, sound has been disabled due to inconsistent timing and empty slots (lack of time)
// Deliberately turned off sound as to have none rather than a few repeated sounds across the whole sim (repetitive and broken)
export const SOUND_ENABLED = false;

const players = {};

const unavailable = new Set();

let muted = false;
let masterVolume = 1;

const loadSound = (name) => {
    const config = SOUND_FILES[name];
    if (!config || players[name] || unavailable.has(name)) return players[name];

    const src = fileUrl(config.file);
    if (!src) {
        unavailable.add(name);
        return undefined;
    }

    const audio = new Audio(src);
    audio.preload = "auto";
    audio.addEventListener("error", () => {
        unavailable.add(name);
        delete players[name];
    });

    players[name] = audio;
    return audio;
};

export const missingSounds = () =>
    Object.entries(SOUND_FILES)
        .filter(([, config]) => !fileUrl(config.file))
        .map(([name, config]) => `${name} (${config.file})`);

export const preloadSounds = () => {
    if (!SOUND_ENABLED) return;

    Object.keys(SOUND_FILES).forEach(loadSound);

    if (import.meta.env.DEV) {
        const missing = missingSounds();
        if (missing.length) console.info(`[audio] ${missing.length} slot(s) waiting on a file: ${missing.join(", ")}`);
    }
};
export const playSound = (name) => {
    if (!SOUND_ENABLED || muted) return;

    const config = SOUND_FILES[name];
    if (!config || unavailable.has(name)) return;

    const base = loadSound(name);
    if (!base) return;

    const node = base.cloneNode();
    node.volume = Math.max(0, Math.min(1, config.volume * masterVolume));

    const played = node.play();
    if (played && typeof played.catch === "function") played.catch(() => {});
};

const STORAGE_KEY = "sector33.audio";

const persist = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ muted, masterVolume }));
    } catch {

    }
};

export const loadAudioPreferences = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        if (typeof saved.muted === "boolean") muted = saved.muted;
        if (typeof saved.masterVolume === "number") {
            masterVolume = Math.max(0, Math.min(1, saved.masterVolume));
        }
    } catch {
    }
    return { muted, masterVolume };
};

export const setMuted = (value) => { muted = Boolean(value); persist(); };
export const isMuted = () => muted;

export const setMasterVolume = (value) => {
    masterVolume = Math.max(0, Math.min(1, value));
    persist();
};
export const getMasterVolume = () => masterVolume;
