// This is the UI menu for the extras which currently only is help and videos, can add more later.
import {useRef, useState} from 'react';
import { ReturnSVG, ExtrasSVG, HelpSVG, LearnSVG } from "../../assets/resources/IconSVGs.jsx";
import { EXTRA_VIDEOS } from "../Components/videoData.jsx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {playSound} from "../Components/soundEffects.jsx";
import {HdsButton, ModalPanel} from "../Components/UIComponents.jsx";
gsap.registerPlugin(useGSAP);

const OPTIONS = [
    { key: "help", label: "HELP", Icon: HelpSVG },
    ...(EXTRA_VIDEOS.length ? [{ key: "videos", label: "VIDEOS", Icon: LearnSVG }] : [])
];

function VideosPanel({ onClose }) {
    return (
        <ModalPanel title="Videos" titleId="videos-panel-heading" onClose={onClose} width="62cqmin">
            <ul className="flex flex-col gap-[1.4cqmin]">
                {EXTRA_VIDEOS.map(({ title, url, blurb }) => (
                    <li key={url}>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="usa-link font-hds-body text-[calc(1.7cqmin*var(--ui-scale,1))] text-nasa-blue-tint"
                        >
                            {title}
                            {/* Spoken, not shown: sighted users get the new-tab convention
                                from the link itself, screen reader users get told. */}
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        {blurb && (
                            <p className="font-hds-body text-carbon-30 text-[calc(1.4cqmin*var(--ui-scale,1))] leading-snug">
                                {blurb}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </ModalPanel>
    );
}

// Additional info more than the tutorial for anyone curious
function HelpPanel({ onClose }) {
    return (
        <ModalPanel title="How to play" titleId="help-panel-heading" onClose={onClose} width="62cqmin">
            <div className="flex flex-col gap-[1.6cqmin] font-hds-body text-carbon-20 text-[calc(1.6cqmin*var(--ui-scale,1))] leading-snug">
                <p>
                    You are an air traffic controller working Sector 33, the airspace over
                    northern California and Nevada. Aircraft arrive from different
                    directions and all of them have to pass over the same waypoint, MOD.
                </p>
                <p>
                    Select an aircraft to see the route it is flying, then set its speed in
                    knots or switch it to another route. Your job is to get every aircraft
                    over MOD in order without ever letting two come too close.
                </p>
                <p>
                    Each level has a target time. Beat it with separation intact for a
                    perfect run. Lose separation at any point and the run counts as a
                    failure, however quick it was.
                </p>
                <p className="text-carbon-30">
                    Full walkthrough: Start, then Tutorial. Keyboard controls are listed
                    under Settings, then Controls.
                </p>
            </div>
        </ModalPanel>
    );
}

const ExtrasMenu = ({ onNavigate }) => {
    const containerRef = useRef(null);
    const [openPanel, setOpenPanel] = useState(null);

    const SHAPE = ".extrasSelectorSVG";
    const OPTION_BUTTONS = [".backBtn", ...OPTIONS.map((option) => `.${option.key}Btn`)];

    const {selectorMenuIn, selectorMenuOut} = globalAnimations();

    useGSAP(() => {
        selectorMenuIn(SHAPE, OPTION_BUTTONS);
    }, {scope: containerRef});

    // Backing out sends the box off to the left, the way it came in
    const handleBackClick = () => {
        playSound("back");
        selectorMenuOut(SHAPE, OPTION_BUTTONS, "-100vw", () => onNavigate('MainMenu'));
    };

    const handleOptionClick = (key) => {
        playSound("buttonClick");
        setOpenPanel(key);
    };

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

                    {/* Extras Box SVG */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[100cqmin] h-[100cqmin]
                    extrasSelectorSVG
                    "
                    >
                        {/*SVG Itself*/}
                        <ExtrasSVG className="extrasBoxSVG text-spacesuit-white"/>

                        {/*Options Parent Wrapper Container*/}
                        <div className="
                        w-[80cqmin]
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        flex items-center justify-center gap-[2.5cqmin] z-10">

                            {/* Wrapper classes drive selectorMenuIn / selectorMenuOut, so they stay */}

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

            {openPanel === "help" && (
                <HelpPanel onClose={() => { playSound("back"); setOpenPanel(null); }}/>
            )}

            {openPanel === "videos" && (
                <VideosPanel onClose={() => { playSound("back"); setOpenPanel(null); }}/>
            )}
        </div>
    );
}

export default ExtrasMenu;
