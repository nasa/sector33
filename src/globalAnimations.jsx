import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const globalAnimations = () => {
    const { contextSafe } = useGSAP();

    // Slide in from below
    const animateIn = contextSafe((selector = '.slide-in') => {
        gsap.fromTo(
            selector,
            { opacity: 0, y: "10vw" },
            {stagger: 0.1, opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
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

    return { animateIn, animateOut };
};
