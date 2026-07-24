import React from 'react';

export const useSimConfig = () => {
    const startingConditions = {
        speed: 100,                     // Constant speed in pixels per second
        box1: { start: 1, end: 0 },     // Box 1 start/end positions
        box2: { start: 0.8, end: 0.2 }  // Box 2 start/end positions
    };

    return { startingConditions };
};
