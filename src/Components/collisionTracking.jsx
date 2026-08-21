// This script tracks the pixel distance between every pair of currently active planes and warns when any pair is too close (same as measureSwitchGap approach)
import { useEffect, useRef, useState } from "react";

export const DEFAULT_SEPARATION_PX = 34.72;

// activePlanes are keys currently in sim
// getPlanePositions from useTrackSwitching returns { [planeKey]: { x, y, ... }
// separationPx is radius around each plane
export const useCollisionTracking = ({ activePlanes, getPlanePositions, separationPx = DEFAULT_SEPARATION_PX }) => {
    const [closePairs, setClosePairs] = useState([]);
    const [everTooClose, setEverTooClose] = useState(false);

    const everTooCloseRef = useRef(false);
    const getPlanePositionsRef = useRef(getPlanePositions);

    getPlanePositionsRef.current = getPlanePositions;

    const rafRef = useRef(null);

    useEffect(() => {
        if (activePlanes.length < 2) {
            setClosePairs([]);
            return undefined;
        }

        const tick = () => {
            const positions = getPlanePositionsRef.current();
            const pairs = [];

            for (let i = 0; i < activePlanes.length; i += 1) {
                for (let j = i + 1; j < activePlanes.length; j += 1) {
                    const a = positions[activePlanes[i]];
                    const b = positions[activePlanes[j]];
                    if (!a || !b) continue;

                    // Straight line distance (threshold acts like radius rather than gap along single track)
                    const gap = Math.hypot(a.x - b.x, a.y - b.y);
                    if (gap < separationPx) {
                        pairs.push({ planeA: activePlanes[i], planeB: activePlanes[j], gap });
                    }
                }
            }

            setClosePairs(pairs);
            if (pairs.length > 0 && !everTooCloseRef.current) {
                everTooCloseRef.current = true;
                setEverTooClose(true);
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [activePlanes, separationPx]);

    // Clears the sticky too-close flag, used when a level is reset or restarted
    const resetCollisionState = () => {
        everTooCloseRef.current = false;
        setEverTooClose(false);
        setClosePairs([]);
    };

    return {
        closePairs,
        tooClose: closePairs.length > 0,
        everTooClose,
        everTooCloseRef,
        resetCollisionState
    };
};
