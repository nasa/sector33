// This script houses most of the resued animations between pages and contains logic for future sounds and motion

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {playSound} from "./soundEffects.jsx";

// Reduced Motion Accessibility Feature
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches;

const motionScale = () => (prefersReducedMotion() ? 0 : 1);


export const globalAnimations = () => {
    const { contextSafe } = useGSAP();

    // Slide in from below
    const animateIn = contextSafe(() => {
        const m = motionScale();
        gsap.fromTo(
            // Center Aligned Items
            '.slide-in',
            { opacity: 0, xPercent: -50, yPercent: -50, y: "10vw"},
            { stagger: 0.1 * m, opacity: 1, y: 0, duration: 0.5 * m, ease: 'power2.out' }
        );

        gsap.fromTo(
            // Non-Center Aligned Items
            '.slide-in-element',
            { opacity: 0,y: "10vw"},
            { stagger: 0.1 * m, opacity: 1, y: 0, duration: 0.5 * m, ease: 'power2.out' }
        );
    });

    const animateOut = contextSafe((onComplete, selector = '.fade-out') => {
        gsap.to(selector, {
            opacity: 0,
            duration: 1 * motionScale(),
            ease: 'power2.out',
            onComplete: onComplete
        });
    });

    const handleMouseEnter = contextSafe((textSelector, svgSelector, shapeSelector) => {
        const d = 0.5 * motionScale();
        playSound("hover");
        const tl = gsap.timeline();
        if (textSelector) tl.to(textSelector, { color: "#FFFFFF", scale: 1.1, duration: d }, 0);
        if (svgSelector)  tl.to(svgSelector,  { color: "#FFFFFF", scale: 1.1, duration: d }, 0);
        if (shapeSelector) tl.to(shapeSelector, { scale: 1.05, duration: d }, 0);
    });

    const handleMouseLeave = contextSafe((textSelector, svgSelector, shapeSelector) => {
        const d = 0.5 * motionScale();
        const tl = gsap.timeline();
        if (textSelector) tl.to(textSelector, { color: "#FFFFFF", scale: 1, duration: d }, 0);
        if (svgSelector)  tl.to(svgSelector,  { color: "#FFFFFF", scale: 1, duration: d }, 0);
        if (shapeSelector) tl.to(shapeSelector, { scale: 1, duration: d }, 0);
    });

    const selectorMenuIn = contextSafe((shapeSelector, buttonSelectors) => {
        const m = motionScale();
        gsap.timeline()
            // Hide everything on load
            .to([shapeSelector, ...buttonSelectors], {autoAlpha: 0, duration: 0}, 0)
            // Shape flies in from the left
            .fromTo(shapeSelector, {autoAlpha: 0, x: "-100vw"}, {autoAlpha: 1, x: 0, duration: 1.5 * m, ease: "power4.out"}, 0.5 * m)
            // Buttons load one by one
            .fromTo(buttonSelectors, {autoAlpha: 0, y: "10vw"}, {stagger: 0.2 * m, autoAlpha: 1, y: 0, duration: 0.5 * m, ease: "power.in"});
    });

    const selectorMenuOut = contextSafe((shapeSelector, buttonSelectors, exitX, onComplete) => {
        const m = motionScale();
        gsap.timeline()
            // Reverse the buttons back out
            .fromTo([...buttonSelectors].reverse(), {autoAlpha: 1, y: 0}, {stagger: 0.1 * m, autoAlpha: 0, y: "10vw", duration: 0.1 * m, ease: "power.out"})
            // Shape flies off the chosen side
            .fromTo(shapeSelector, {autoAlpha: 1, x: 0}, {autoAlpha: 0, x: exitX, duration: 0.5 * m, ease: "power4.in"}, 0.25 * m)
            // Hide everything, then hand over to the next page
            .to([shapeSelector, ...buttonSelectors], {autoAlpha: 0, duration: 0, onComplete});
    });

    const introBannerSlideInOut = contextSafe(() => {
        const m = motionScale();
        gsap.timeline()
            .set(".intro", {autoAlpha: 1, xPercent: -100})
            .to(".intro", {xPercent: 100, duration: 1.5 * m, ease: "power4.out"}, 0.5 * m)
            .to(".intro", {xPercent: -100, duration: 1.5 * m, ease: "power4.in"}, 5 * m)
            .to(".intro", {autoAlpha: 0, duration: 0.5 * m});

    });

    return { animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut, selectorMenuIn, selectorMenuOut };
};