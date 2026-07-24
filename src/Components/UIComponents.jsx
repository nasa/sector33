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