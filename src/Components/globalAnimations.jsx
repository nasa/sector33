import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {InfoSVG} from "../../assets/resources/ButtonSVGs.jsx";
import React from "react";

export const globalAnimations = () => {
    const { contextSafe } = useGSAP();

    // Slide in from below
    const animateIn = contextSafe(() => {
        gsap.fromTo(
            // Center Aligned Items
            '.slide-in',
            { opacity: 0, xPercent: -50, yPercent: -50, y: "10vw"},
            { stagger: 0.1, opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );

        gsap.fromTo(
            // Non-Center Aligned Items
            '.slide-in-element',
            { opacity: 0,y: "10vw"},
            { stagger: 0.1, opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    });

    // General Fade Out w/onComplete trigger
    const animateOut = contextSafe((onComplete, selector = '.fade-out') => {
        gsap.to(selector, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: onComplete
        });
    });

    // Button Mouse Enter (Expects individual dot selectors: textSelector, svgSelector, shapeSelector)
    const handleMouseEnter = contextSafe((textSelector, svgSelector, shapeSelector) => {
        const tl = gsap.timeline();
        if (textSelector) tl.to(textSelector, { color: "#FFFFFF", scale: 1.1, duration: 0.5 }, 0);
        if (svgSelector)  tl.to(svgSelector,  { color: "#FFFFFF", scale: 1.1, duration: 0.5 }, 0);
        if (shapeSelector) tl.to(shapeSelector, { scale: 1.05, duration: 0.5 }, 0);
    });

    // Button Mouse Leave (Expects individual dot selectors: textSelector, svgSelector, shapeSelector)
    const handleMouseLeave = contextSafe((textSelector, svgSelector, shapeSelector) => {
        const tl = gsap.timeline();
        if (textSelector) tl.to(textSelector, { color: "#3b3a3a", scale: 1, duration: 0.5 }, 0);
        if (svgSelector)  tl.to(svgSelector,  { color: "#3b3a3a", scale: 1, duration: 0.5 }, 0);
        if (shapeSelector) tl.to(shapeSelector, { scale: 1, duration: 0.5 }, 0);
    });

    // Intro Banner Slide in and Out Animation, no dot selectors
    // Resets to its starting position/visibility first, since the previous run
    // leaves it faded out and off screen, and this can be called again on the
    // same mounted page (e.g. switching levels on Stage without remounting).
    const introBannerSlideInOut = contextSafe(() => {
        gsap.timeline()
            .set(".intro", {autoAlpha: 1, xPercent: -100})
            .to(".intro", {xPercent: 100, duration: 1.5, ease: "power4.out"}, 0.5)
            .to(".intro", {xPercent: -100, duration: 1.5, ease: "power4.in"}, 5)
            .to(".intro", {autoAlpha: 0, duration: 0.5});

    });



    return { animateIn, animateOut, handleMouseEnter, handleMouseLeave, introBannerSlideInOut };
};