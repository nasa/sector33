// This script is the UI for the settings menu to handle the sound, display, and controls for accessability

import {useRef, useState, useEffect} from 'react';
import { ReturnSVG, SettingsSVG, SoundSVG, DisplaySVG, ControlsSVG } from "../../assets/resources/IconSVGs.jsx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {playSound} from "../Components/soundEffects.jsx";
import {HdsButton, ModalPanel} from "../Components/UIComponents.jsx";
import {
    getTextScale, setTextScale,
    TEXT_SCALE_MIN, TEXT_SCALE_MAX, TEXT_SCALE_STEP
} from "../Components/displaySettings.jsx";
gsap.registerPlugin(useGSAP);

const OPTIONS = [
    { key: "sound", label: "SOUND", Icon: SoundSVG },
    { key: "display", label: "DISPLAY", Icon: DisplaySVG },
    { key: "controls", label: "CONTROLS", Icon: ControlsSVG }
];

// Disabled for now
function SoundPanel({ onClose }) {
    return (
        <ModalPanel title="Sound" titleId="sound-panel-heading" onClose={onClose}>
            <div className="flex flex-col gap-[1.4cqmin] font-hds-body text-[calc(1.7cqmin*var(--ui-scale,1))] leading-snug">
                <p className="text-spacesuit-white font-bold">Sound is coming in a later release.</p>
                <p className="text-carbon-20">
                    The simulator is silent for now. Nothing is wrong with your device or
                    your volume, and there is nothing here you need to change.
                </p>
                <p className="text-carbon-30">
                    Every action gives you visual feedback, so nothing about the game depends
                    on hearing it.
                </p>
            </div>
        </ModalPanel>
    );
}

// Fullscreen and text size
function DisplayPanel({ onClose }) {
    const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));
    const [unsupported, setUnsupported] = useState(false);
    const [textScale, setTextScaleState] = useState(() => getTextScale());

    const changeTextScale = (event) => {
        setTextScaleState(setTextScale(event.target.value));
    };

    useEffect(() => {
        const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", sync);
        return () => document.removeEventListener("fullscreenchange", sync);
    }, []);

    const toggleFullscreen = async () => {
        playSound("buttonClick");
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else await document.documentElement.requestFullscreen();
        } catch {
            // Blocked by the browser or unavailable (iOS Safari has no Element fullscreen)
            setUnsupported(true);
        }
    };

    return (
        <ModalPanel title="Display" titleId="display-panel-heading" onClose={onClose}>
            <div className="flex items-center justify-between gap-[2cqmin]">
                <span className="text-spacesuit-white font-hds-body text-[calc(1.8cqmin*var(--ui-scale,1))]">
                    {isFullscreen ? "Fullscreen is on" : "Fullscreen is off"}
                </span>
                <button
                    type="button"
                    aria-pressed={isFullscreen}
                    onClick={toggleFullscreen}
                    className={`usa-button ${isFullscreen ? "" : "usa-button--secondary"}`}
                    style={{ fontSize: "calc(1.6cqmin * var(--ui-scale, 1))", paddingBlock: "0.6em", paddingInline: "1.2em", margin: 0 }}
                >
                    {isFullscreen ? "Exit fullscreen" : "Go fullscreen"}
                </button>
            </div>

            <p className="text-carbon-30 font-hds-body text-[calc(1.5cqmin*var(--ui-scale,1))] leading-snug">
                The simulator always keeps a 16:9 shape and scales to fit the window, so
                fullscreen gives it more room rather than changing the layout.
            </p>


            <div className="flex flex-col gap-[1cqmin]">
                <label htmlFor="text-scale"
                       className="text-spacesuit-white font-hds-body text-[calc(1.8cqmin*var(--ui-scale,1))]">
                    Text size: {Math.round(textScale * 100)}%
                </label>
                <input
                    id="text-scale"
                    type="range"
                    min={TEXT_SCALE_MIN}
                    max={TEXT_SCALE_MAX}
                    step={TEXT_SCALE_STEP}
                    value={textScale}
                    aria-valuetext={`${Math.round(textScale * 100)} percent`}
                    onChange={changeTextScale}
                    className="w-full accent-nasa-blue"
                />
                <p className="text-carbon-30 font-hds-body text-[calc(1.4cqmin*var(--ui-scale,1))] leading-snug">
                    Applies everywhere and is remembered next time. Browser zoom (ctrl + mouse wheel) has no
                    effect on this game, so use this instead.
                </p>
            </div>

            {unsupported && (
                <p role="status" className="text-nasa-red-tint font-hds-body text-[calc(1.5cqmin*var(--ui-scale,1))]">
                    This browser would not allow fullscreen. Try your browser's own
                    fullscreen control instead.
                </p>
            )}
        </ModalPanel>
    );
}

// Keyboard Control for reference
const CONTROL_GROUPS = [
    {
        heading: "In the simulator",
        rows: [
            { keys: "Tab", action: "Switch to the next aircraft" },
            { keys: "Shift + Tab", action: "Jump to the Levels and Menu buttons" },
            { keys: "Arrow keys", action: "Move the highlight through the knots rows, Switch Track, and the transport controls" },
            { keys: "Enter / Space", action: "Press whatever is highlighted" },
            { keys: "Escape", action: "Deselect the current aircraft" }
        ]
    },
    {
        heading: "Menus and panels",
        rows: [
            { keys: "Tab", action: "Move to the next button" },
            { keys: "Enter / Space", action: "Press the focused button" },
            { keys: "Escape", action: "Close the open panel" }
        ]
    },
    {
        heading: "Mouse",
        rows: [
            { keys: "Click an aircraft", action: "Select it and show its route and speed controls" },
            { keys: "Click empty airspace", action: "Deselect" }
        ]
    }
];

function ControlsPanel({ onClose }) {
    return (
        <ModalPanel title="Controls" titleId="controls-panel-heading" onClose={onClose} width="62cqmin">

            {CONTROL_GROUPS.map(({ heading, rows }) => (
                <section key={heading} className="flex flex-col gap-[1cqmin]">
                    <h3 className="font-hds-heading font-bold text-nasa-blue-tint text-[calc(1.7cqmin*var(--ui-scale,1))]">
                        {heading}
                    </h3>
                    <dl className="flex flex-col gap-[1cqmin]">
                        {rows.map(({ keys, action }) => (
                            <div key={keys} className="flex items-baseline gap-[1.5cqmin]">
                                <dt className="font-hds-mono font-bold text-spacesuit-white text-[calc(1.5cqmin*var(--ui-scale,1))]
                                    shrink-0 w-[22cqmin] text-right">
                                    {keys}
                                </dt>
                                <dd className="font-hds-body text-carbon-20 text-[calc(1.5cqmin*var(--ui-scale,1))] leading-snug">
                                    {action}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>
            ))}
        </ModalPanel>
    );
}

const PANELS = {
    sound: SoundPanel,
    display: DisplayPanel,
    controls: ControlsPanel
};

const SettingsMenu = ({ onNavigate }) => {
    const containerRef = useRef(null);
    const [openPanel, setOpenPanel] = useState(null);

    const SHAPE = ".settingsSelectorSVG";
    const OPTION_BUTTONS = [".backBtn", ...OPTIONS.map((option) => `.${option.key}Btn`)];

    const {selectorMenuIn, selectorMenuOut} = globalAnimations();

    useGSAP(() => {
        selectorMenuIn(SHAPE, OPTION_BUTTONS);
    }, {scope: containerRef});

    // Backing out sends the gear off to the left, the way it came in
    const handleBackClick = () => {
        playSound("back");
        selectorMenuOut(SHAPE, OPTION_BUTTONS, "-100vw", () => onNavigate('MainMenu'));
    };

    const handleOptionClick = (key) => {
        playSound("buttonClick");
        setOpenPanel(key);
    };

    const OpenPanel = openPanel ? PANELS[openPanel] : null;

    return (
        <div ref={containerRef}
             className="w-full h-full bg-carbon-90 relative"
        >

            {/*Main Content Modal*/}
            <div className="absolute
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[90cqi] h-[90cqb]
            ">
                {/* Modal Container */}
                <div className="flex justify-between w-full h-full overflow-hidden relative">

                    {/* Settings Gear SVG */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[100cqmin] h-[100cqmin]
                    settingsSelectorSVG
                    "
                    >
                        {/*SVG Itself*/}
                        <SettingsSVG className="settingsGearSVG text-spacesuit-white"/>

                        {/*Options Parent Wrapper Container*/}
                        <div className="
                        w-[80cqmin]
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        flex items-center justify-center gap-[2.5cqmin] z-10">


                            {/*Back Button*/}
                            <div className="backBtn">
                                <HdsButton
                                    variant="outline"
                                    className="hds-btn-on-art"
                                    Icon={ReturnSVG}
                                    label="BACK"
                                    size="2.2cqmin"
                                    onPress={handleBackClick}
                                />
                            </div>

                            {/*Option Buttons*/}
                            {OPTIONS.map(({ key, label, Icon }) => (
                                <div key={key} className={`${key}Btn`}>
                                    <HdsButton
                                        variant="secondary"
                                        Icon={Icon}
                                        label={label}
                                        size="2.2cqmin"
                                        onPress={() => handleOptionClick(key)}
                                    />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

            {OpenPanel && (
                <OpenPanel onClose={() => { playSound("back"); setOpenPanel(null); }}/>
            )}
        </div>
    );
}

export default SettingsMenu;
