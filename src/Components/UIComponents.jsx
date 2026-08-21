// This script handles

import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {InfoSVG} from '../../assets/resources/ButtonSVGs.jsx';
import {ExitSVG, LevelSVG, StormIconSVG} from "../../assets/resources/IconSVGs.jsx";
import {TICK_PX} from "./SimConfig.jsx";
import {playSound} from "./soundEffects.jsx";
import {prefersReducedMotion} from "./globalAnimations.jsx";
import hdsSpriteUrl from "@nasa-hds/core/assets/img/hds-sprite.svg?url";

const RING_RADIUS = TICK_PX;
const CALLSIGN_GAP = 6;


// Follows the plane pos and draws range ring and callsign
export function PlaneMarkerOverlay({ activePlanes, startingConditions, getPlanePositions }) {
    const groupRefs = useRef({});
    const positionsRef = useRef(getPlanePositions);
    positionsRef.current = getPlanePositions;

    useEffect(() => {
        let frame;
        const tick = () => {
            const positions = positionsRef.current();

            activePlanes.forEach((planeKey) => {
                const group = groupRefs.current[planeKey];
                if (!group) return;

                const position = positions[planeKey];
                if (!position) {
                    group.setAttribute("opacity", "0");
                    return;
                }

                group.setAttribute("opacity", "1");
                group.setAttribute("transform", `translate(${position.x} ${position.y})`);
            });

            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [activePlanes]);

    return (
        <svg viewBox="40 25 840 400" width="100%" height="100%">
            {activePlanes.map((planeKey) => {
                const plane = startingConditions[planeKey];
                if (!plane) return null;

                const color = `#${plane.color}`;

                return (
                    <g key={planeKey} opacity="0" ref={(element) => { groupRefs.current[planeKey] = element; }}>
                        <circle r={RING_RADIUS} fill="none" stroke={color} strokeWidth="1" opacity="0.45"/>
                        <text y={-(RING_RADIUS + CALLSIGN_GAP)} textAnchor="middle" fill={color}
                              fontSize="13" fontFamily="DM Mono, ui-monospace, monospace" fontWeight="bold">
                            {plane.callsign}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

// HDS button
const HDS_VARIANT = {
    cta: "usa-button",
    secondary: "usa-button usa-button--secondary",
    outline: "usa-button usa-button--outline",
    unstyled: "usa-button usa-button--unstyled"
};

export function HdsButton({ variant = "cta", Icon, label, size = "2.4cqmin", className = "", onPress, disabled = false, tabIndex }) {
    return (
        <button
            type="button"
            disabled={disabled}
            tabIndex={tabIndex}
            className={`${HDS_VARIANT[variant]} inline-flex items-center justify-center gap-[0.5em] ${className}`}
            style={{ fontSize: `calc(${size} * var(--ui-scale, 1))`, paddingBlock: "0.75em", paddingInline: "1.25em", margin: 0 }}
            onMouseEnter={() => playSound("hover")}
            onClick={(event) => {
                event.stopPropagation();
                onPress();
            }}
        >
            {Icon && <Icon className="shrink-0 w-[1.2em] h-[1.2em]"/>}
            {label}
        </button>
    );
}


// Dialog shell shared by every panel and intended not to be a modal like a pop-up, but an interactive item to click on to align with HDS (can be called modal in code)
export function ModalPanel({ title, titleId, onClose, children, width = "46cqmin" }) {
    const closeRef = useRef(null);

    useEffect(() => { closeRef.current?.querySelector("button")?.focus(); }, []);

    useEffect(() => {
        const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    return (
        <div role="dialog"
             aria-modal="true"
             aria-labelledby={titleId}
             className="absolute inset-0 z-30 flex items-center justify-center bg-carbon-black/70"
        >
            <div style={{ width }}
                 className="bg-carbon-90 border-2 border-nasa-blue rounded-xl
                 px-[4cqmin] py-[3cqmin] max-h-[86cqb] overflow-y-auto
                 flex flex-col gap-[2.5cqmin]">

                <h2 id={titleId}
                    className="text-spacesuit-white font-hds-heading font-bold text-[calc(2.6cqmin*var(--ui-scale,1))] text-center">
                    {title}
                </h2>

                {children}

                <div className="flex justify-center mt-[0.5cqmin]">
                    <div ref={closeRef}>
                        <HdsButton
                            variant="outline"
                            label="BACK"
                            size="1.8cqmin"
                            onPress={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// HDS cooperation icons
export function HdsIcon({ name, className = "hds-icon", title }) {
    return (
        <svg className={className} focusable="false"
             aria-hidden={title ? undefined : "true"}
             role={title ? "img" : undefined}>
            {title && <title>{title}</title>}
            <use href={`${hdsSpriteUrl}#${name}`}/>
        </svg>
    );
}

export function HdsIconButton({ name, label, text, variant = "utility", size = "7.5cqmin",
                                  className = "", onPress, disabled = false, busy = false, tabIndex }) {
    const inactive = disabled || busy;

    return (
        <button
            type="button"
            disabled={disabled}
            tabIndex={tabIndex}
            aria-disabled={busy || undefined}
            aria-label={label}
            title={label}
            className={`hds-btn-icon hds-btn-icon--${variant} hds-btn-icon--fluid ${busy ? "cursor-not-allowed" : ""} ${className}`}
            style={{ "--hds-btn-icon-size": size }}
            onMouseEnter={() => { if (!inactive) playSound("hover"); }}
            onClick={(event) => {
                event.stopPropagation();
                if (inactive) return;
                onPress();
            }}
        >
            {text
                ? <span className="hds-btn-icon__text" style={{ fontSize: `calc(${size} * 0.26 * var(--ui-scale, 1))` }}>{text}</span>
                : <HdsIcon name={name}/>}
        </button>
    );
}

function CornerNavBtn({ label, Icon, position, onPress }) {
    return (
        <div className={`absolute ${position}`}>
            <HdsButton
                variant="outline"
                className="corner-nav"
                Icon={Icon}
                label={label}
                size="1.9cqmin"
                onPress={onPress}
            />
        </div>
    );
}

export function ReturnToMenuBtn({ menuPressed }) {
    return (
        <CornerNavBtn
            label="MENU"
            Icon={ExitSVG}
            position="top-[2cqh] right-[2cqw]"
            onPress={menuPressed}
        />
    );
}

export function ReturnToLevelsBtn({ levelsPressed }) {
    return (
        <CornerNavBtn
            label="LEVELS"
            Icon={LevelSVG}
            position="top-[2cqh] right-[13cqw]"
            onPress={levelsPressed}
        />
    );
}

// Storm markers
const STORM_MARKS = {
    track1: { x: 380.8, y: 150.3 },
    track2: { x: 493.5, y: 150.3 },
    track3: { x: 381.8, y: 300.3 },
    track4: { x: 494.5, y: 300.3 }
};

const STORM_SIZE = 54;

// Marks the route is closed off (decoration only but helps users visualize)
export function StormOverlay({ blockedTracks = [] }) {
    if (!blockedTracks.length) return null;

    return (
        <svg viewBox="40 25 840 400" width="100%" height="100%">
            {blockedTracks.map((trackKey) => {
                const mark = STORM_MARKS[trackKey];
                if (!mark) return null;

                return (
                    <StormIconSVG
                        key={trackKey}
                        x={mark.x - STORM_SIZE / 2}
                        y={mark.y - STORM_SIZE / 2}
                        width={STORM_SIZE}
                        height={STORM_SIZE}
                        className="text-carbon-40"
                    />
                );
            })}
        </svg>
    );
}

const TICKER_SECONDS_PER_SCREEN = 14;

// Scrolls the ticking text
export function ScrollingTicker({ text, className = "", buttonClassName = "", label = "Announcements" }) {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const tweenRef = useRef(null);
    const [scrolling, setScrolling] = useState(false);

    // HDS require pause ticking text
    const [paused, setPaused] = useState(() => prefersReducedMotion());
    const pausedRef = useRef(paused);
    pausedRef.current = paused;

    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return undefined;

        const measure = () => {
            if (tweenRef.current) tweenRef.current.kill();

            // Measure one copy only, the second exists purely to cover the wrap
            const contentWidth = track.firstElementChild.offsetWidth;
            const viewportWidth = viewport.offsetWidth;
            if (!contentWidth || !viewportWidth) return;

            const needsScroll = contentWidth > viewportWidth;
            setScrolling(needsScroll);

            if (!needsScroll) {
                gsap.set(track, { x: (viewportWidth - contentWidth) / 2 });
                return;
            }

            gsap.set(track, { x: 0 });
            tweenRef.current = gsap.to(track, {
                x: -contentWidth,
                duration: TICKER_SECONDS_PER_SCREEN * (contentWidth / viewportWidth),
                ease: "none",
                repeat: -1,
                paused: pausedRef.current
            });
        };

        measure();

        // observer watches text and viewport
        const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
        if (observer) {
            observer.observe(viewport);
            if (track.firstElementChild) observer.observe(track.firstElementChild);
        }

        return () => {
            if (observer) observer.disconnect();
            if (tweenRef.current) tweenRef.current.kill();
        };
    }, [text]);

    useEffect(() => {
        const tween = tweenRef.current;
        if (!tween) return;
        if (paused) tween.pause();
        else tween.play();
    }, [paused, scrolling]);

    return (
        <div className={`flex items-center gap-[1.5cqmin] ${className}`}>
            <div ref={viewportRef} className="overflow-hidden flex-1">
                <div ref={trackRef} className="flex w-max">
                    <span className="whitespace-pre pr-[8cqmin]">{text}</span>
                    <span aria-hidden="true" className={`whitespace-pre pr-[8cqmin] ${scrolling ? "" : "invisible"}`}>
                        {text}
                    </span>
                </div>
            </div>

            {scrolling && (
                <HdsIconButton
                    name={paused ? "play" : "pause"}
                    label={paused ? `Resume scrolling ${label}` : `Pause scrolling ${label}`}
                    size="3.2cqmin"
                    className={`shrink-0 ${buttonClassName}`}
                    onPress={() => setPaused((wasPaused) => !wasPaused)}
                />
            )}
        </div>
    );
}

// Prox warning assertive pop up on purpose from simulator, not a permanent pop up
export function ProximityWarning({ visible }) {
    if (!visible) return null;

    return (
        <div role="alert" className="absolute top-[2cqh] left-1/2 -translate-x-1/2 z-20
            bg-nasa-red-shade text-spacesuit-white font-hds-heading font-bold
            px-[3cqmin] py-[1.5cqmin] text-[calc(1.8cqmin*var(--ui-scale,1))]
            rounded-[1cqmin] border border-nasa-red
            ">
            Planes Too Close!
        </div>
    );
}

const SCORE_TIER_STYLES = {
    perfect: "bg-carbon-80 border-active-green",
    success: "bg-carbon-80 border-nasa-blue",
    failure: "bg-carbon-80 border-nasa-red"
};

// Shows the level complete screen and options to continue with more
export function LevelCompleteModal({ levelTitle, score, elapsedSeconds, hasNextLevel, onNextLevel, onRestart, onMainMenu }) {
    const firstActionRef = useRef(null);

    useEffect(() => {
        if (score) firstActionRef.current?.querySelector("button")?.focus();
    }, [score]);

    if (!score) return null;

    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-carbon-black/60"
             onClick={(e) => e.stopPropagation()}
        >
            <div role="dialog"
                 aria-modal="true"
                 aria-labelledby="level-result-heading"
                 className={`text-spacesuit-white font-hds-heading font-bold text-center
                px-[4cqmin] py-[3cqmin]
                bg-carbon-90
                rounded-xl border ${SCORE_TIER_STYLES[score.tier]}
                flex flex-col items-center gap-[1.5cqmin]
                `}>
                {levelTitle && (
                    <div className="text-[calc(1.6cqmin*var(--ui-scale,1))] opacity-70 font-hds-mono">{levelTitle}</div>
                )}
                <div id="level-result-heading" className="text-[calc(3cqmin*var(--ui-scale,1))]">{score.label}</div>
                {typeof elapsedSeconds === "number" && (
                    <div className="text-[calc(2cqmin*var(--ui-scale,1))] font-hds-mono">Time: {elapsedSeconds.toFixed(1)}s</div>
                )}

                {score.tier !== "perfect" && typeof score.idealTimeSeconds === "number" && (
                    <div className="text-[calc(1.6cqmin*var(--ui-scale,1))] opacity-70 font-hds-mono">
                        Target: {score.idealTimeSeconds.toFixed(1)}s
                    </div>
                )}

                <div ref={firstActionRef} className="flex flex-col gap-[1cqmin] w-[22cqmin] mt-[1cqmin]">
                    {hasNextLevel && (
                        <HdsButton
                            variant="cta"
                            label="Next Level"
                            size="1.8cqmin"
                            className="w-full"
                            onPress={onNextLevel}
                        />
                    )}
                    <HdsButton
                        variant="secondary"
                        label="Restart Level"
                        size="1.8cqmin"
                        className="w-full"
                        onPress={onRestart}
                    />
                    <HdsButton
                        variant="outline"
                        label="Main Menu"
                        size="1.8cqmin"
                        className="w-full"
                        onPress={onMainMenu}
                    />
                </div>
            </div>
        </div>
    );
}

export function StageLevelLabel({ text }) {
    return (
        <div className="levelLabel absolute
            top-[3cqb] left-[35.5cqi]
            font-hds-mono font-bold text-[calc(1.8cqmin*var(--ui-scale,1))] text-carbon-30
            pointer-events-none
            ">
            {text}
        </div>
    );
}

export function IntroBanner({ text }) {
    return (
        <div className="absolute top-[10%] left-0 -translate-x-full w-[45cqmin] intro">
            <InfoSVG className="w-full h-auto opacity-50"
                     style={{'--svg-fill': '#9f9a9a', '--svg-shadow': '#2e2e2e'}}
            />

            {/*Text inside SVG*/}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-spacesuit-white font-bold font-hds-heading text-[calc(2.5cqmin*var(--ui-scale,1))] tracking-wide">
                            {text}
                        </span>
            </div>
        </div>
    );
}
