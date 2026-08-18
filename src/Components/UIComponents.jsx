import React from 'react';
import {InfoSVG, QuitBtnSVG} from '../../assets/resources/ButtonSVGs.jsx';
import {ExitSVG} from "../../assets/resources/IconSVGs.jsx";


export function ReturnToMenuBtn({ handleMouseEnter,handleMouseLeave, menuPressed }) {
    return (
        <button className="absolute
                top-[2cqh] right-[2cqw]
                w-[20cqmin] h-[10cqmin]
                "
                onMouseEnter={() => handleMouseEnter(".menuText", ".quitDoorSVG", ".quitShapeSVG")}
                onMouseLeave={() => handleMouseLeave(".menuText", ".quitDoorSVG", ".quitShapeSVG")}
                onClick={() => menuPressed()}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-[#3b3a3a]">
                <ExitSVG className="quitDoorSVG w-[8cqmin] h-[8cqmin]"/>
                <span className="menuText text-[3cqmin] font-mono font-bold">
                                MENU
                </span>
            </div>

            <QuitBtnSVG className="quitShapeSVG" style={{'--svg-fill': '#6c757d', '--svg-shadow': '#495057'}}></QuitBtnSVG>

        </button>
    );
}

export function ProximityWarning({ visible }) {
    if (!visible) return null;

    return (
        <div className="absolute top-[2cqh] left-1/2 -translate-x-1/2 z-20
            bg-red-800 text-white font-mono font-bold
            px-[3cqmin] py-[1.5cqmin]
            rounded-lg border border-red-400
            ">
            Planes too close
        </div>
    );
}

const SCORE_TIER_STYLES = {
    perfect: "bg-emerald-700 border-emerald-400",
    success: "bg-blue-700 border-blue-400",
    failure: "bg-red-800 border-red-400"
};

const MODAL_BUTTON_STYLES = "w-full rounded-lg py-[1cqmin] text-[1.8cqmin] transition-colors duration-150";

// elapsedSeconds is the controls timer reading at completion, kept separate from
// score.elapsedSeconds (the wall-clock time used to grade the run) so the number
// shown here always matches what the player was watching tick up during the run.
export function LevelCompleteModal({ levelTitle, score, elapsedSeconds, hasNextLevel, onNextLevel, onRestart, onMainMenu }) {
    if (!score) return null;

    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60"
             onClick={(e) => e.stopPropagation()}
        >
            <div className={`text-white font-mono font-bold text-center
                px-[4cqmin] py-[3cqmin]
                bg-slate-900
                rounded-xl border ${SCORE_TIER_STYLES[score.tier]}
                flex flex-col items-center gap-[1.5cqmin]
                `}>
                {levelTitle && (
                    <div className="text-[1.6cqmin] opacity-70">{levelTitle}</div>
                )}
                <div className="text-[3cqmin]">{score.label}</div>
                {typeof elapsedSeconds === "number" && (
                    <div className="text-[2cqmin]">Time: {elapsedSeconds.toFixed(1)}s</div>
                )}

                <div className="flex flex-col gap-[1cqmin] w-[22cqmin] mt-[1cqmin]">
                    {hasNextLevel && (
                        <button
                            className={`${MODAL_BUTTON_STYLES} bg-emerald-600 hover:bg-emerald-500`}
                            onClick={onNextLevel}
                        >
                            Next Level
                        </button>
                    )}
                    <button
                        className={`${MODAL_BUTTON_STYLES} bg-blue-600 hover:bg-blue-500`}
                        onClick={onRestart}
                    >
                        Restart Level
                    </button>
                    <button
                        className={`${MODAL_BUTTON_STYLES} bg-slate-600 hover:bg-slate-500`}
                        onClick={onMainMenu}
                    >
                        Main Menu
                    </button>
                </div>
            </div>
        </div>
    );
}

export function IntroBanner({ text }) {
    return (
        <div className="absolute top-[10%] left-0 -translate-x-full w-[45cqmin] intro">
            <InfoSVG className="w-full h-auto opacity-50"
                     style={{'--svg-fill': '#9f9a9a ', '--svg-shadow': '#2e2e2e'}}
            />

            {/*Text inside SVG*/}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-emerald-400 font-bold font-mono text-[2.5cqmin] tracking-wide">
                            {text}
                        </span>
            </div>
        </div>
    );
}