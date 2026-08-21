// This houses the UI for the levels and grabs the data from elsewhere so this is just UI
import {useRef, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
import {LEVELS_DATA, DIFFICULTY_TIERS} from "../Components/levelsData.jsx";
import {globalAnimations} from "../Components/globalAnimations.jsx";
import {IntroBanner, ReturnToMenuBtn, HdsButton} from "../Components/UIComponents.jsx";
import {playSound} from "../Components/soundEffects.jsx";

const LEVELS_PER_PAGE = 24;

const Levels = ({ onNavigate }) => {

    const containerRef = useRef(null);

    const [page, setPage] = useState(0);
    const pageCount = Math.max(1, Math.ceil(LEVELS_DATA.length / LEVELS_PER_PAGE));
    const visibleLevels = LEVELS_DATA.slice(page * LEVELS_PER_PAGE, (page + 1) * LEVELS_PER_PAGE);

    const {animateIn, animateOut, introBannerSlideInOut} = globalAnimations();

    const {contextSafe} = useGSAP(() => {
        introBannerSlideInOut();
        animateIn();

    }, {scope: containerRef});

    const levelPressed = (levelId) => {
        playSound("buttonClick");
        animateOut(() => onNavigate('Stage', levelId), '.fade-out');
    };

    // Handle page exit sequence
    const menuPressed = () => {
        playSound("back");
        animateOut(() => onNavigate('MainMenu'), '.fade-out');
    };

    const turnPage = (delta) => {
        playSound("nextPrev");
        setPage((current) => Math.min(pageCount - 1, Math.max(0, current + delta)));
    };

    return (
        <div ref={containerRef}
             className="w-full h-full bg-carbon-90 relative"
        >

            <ReturnToMenuBtn
                menuPressed={menuPressed}
            />

            {/*Intro Banner SVG*/}
            <IntroBanner text="Select Your Level!" />

            {/*Levels Grid*/}
            <div className="levelsMenu slide-in-element fade-out absolute
                left-[6cqi] w-[88cqi] top-[16cqb] bottom-[22cqb]
                grid grid-cols-6 grid-rows-4 gap-[1.2cqmin]
                ">
                {visibleLevels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => levelPressed(level.id)}
                        aria-label={`Level ${level.id}, ${level.planeCount} planes, ${level.label}`}
                        className={`flex flex-col items-center justify-center
                            border-2 cursor-pointer
                            transition-colors duration-200
                            ${level.bg} ${level.border}`}
                    >
                        <span aria-hidden="true" className={`font-hds-mono font-bold text-[calc(2.6cqmin*var(--ui-scale,1))] leading-none ${level.text}`}>
                            {level.id}
                        </span>
                        <span aria-hidden="true" className="font-hds-mono text-[calc(1.2cqmin*var(--ui-scale,1))] text-carbon-30 mt-[0.4cqmin]">
                            {level.planeCount} Planes
                        </span>
                    </button>
                ))}
            </div>

            {/*Difficulty Key*/}
            <div className="fade-out absolute
                bottom-[13cqb] left-1/2 -translate-x-1/2
                flex items-center gap-[2.5cqmin]
                ">
                {Object.values(DIFFICULTY_TIERS).map((tier) => (
                    <div key={tier.planeCount} className="flex items-center gap-[0.6cqmin]">
                        <span className={`w-[1.2cqmin] h-[1.2cqmin] rounded-full ${tier.swatch}`}/>
                        <span className="font-hds-mono text-[calc(1.3cqmin*var(--ui-scale,1))] text-carbon-40">{tier.label}</span>
                    </div>
                ))}
            </div>

            {/*Page Controls*/}
            <div className="fade-out absolute
                bottom-[6cqb] left-1/2 -translate-x-1/2
                flex items-center gap-[3cqmin]
                ">
                <HdsButton
                    variant="secondary"
                    label="Prev"
                    size="1.8cqmin"
                    disabled={page === 0}
                    onPress={() => turnPage(-1)}
                />

                <span className="text-spacesuit-white font-hds-mono text-[calc(1.8cqmin*var(--ui-scale,1))] w-[16cqmin] text-center">
                    Page {page + 1} of {pageCount}
                </span>

                <HdsButton
                    variant="secondary"
                    label="Next"
                    size="1.8cqmin"
                    disabled={page >= pageCount - 1}
                    onPress={() => turnPage(1)}
                />
            </div>
        </div>
    );
}

export default Levels;
