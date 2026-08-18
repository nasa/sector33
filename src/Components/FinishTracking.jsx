// Watches for planes reaching MOD and lines them up behind each other. The first
// plane in keeps flying to the furthest FINISH waypoint, each following plane stops
// one slot nearer, and the last plane finishes at MOD as normal. The level is only
// reported finished once every plane has come to rest on its slot.
import { useEffect, useRef } from "react";
import { tracks, resolvePixel } from "./SimConfig.jsx";

const MOD_WAYPOINT = "0_MOD";

// The motion tween lands a hair past its target (173.59000000000003 rather than
// 173.59), so an exact comparison would never register an arrival
const ARRIVAL_TOLERANCE_PX = 0.5;

const pixelOf = (trackKey, waypoint) =>
    resolvePixel(tracks[trackKey]?.SvgComponent?.breakpoints, waypoint);

// A plane is at rest once it has reached the pixel it was told to stop on
const allPlanesAtRest = (activePlanes, positions, restPixels) =>
    activePlanes.every((planeKey) => {
        const position = positions[planeKey];
        const restPixel = restPixels[planeKey];
        if (!position || typeof restPixel !== "number") return false;
        return position.pixel <= restPixel + ARRIVAL_TOLERANCE_PX;
    });

// activePlanes - keys currently in sim
// getPlanePositions - from useTrackSwitching
// extendPlaneTo(planeKey, waypointName) - from useTrackSwitching
// onAllPlanesFinished - called once, when every plane has stopped moving
export const useFinishTracking = ({
    activePlanes,
    getPlanePositions,
    extendPlaneTo,
    onAllPlanesFinished
}) => {
    const arrivedRef = useRef(new Set());

    // planeKey -> pixel that plane should come to rest on, its FINISH slot or MOD
    const restPixelsRef = useRef({});
    const finishedRef = useRef(false);

    const getPositionsRef = useRef(getPlanePositions);
    getPositionsRef.current = getPlanePositions;
    const extendRef = useRef(extendPlaneTo);
    extendRef.current = extendPlaneTo;
    const onAllRef = useRef(onAllPlanesFinished);
    onAllRef.current = onAllPlanesFinished;

    // Fresh arrival order whenever the level, and so its active planes, changes
    useEffect(() => {
        arrivedRef.current = new Set();
        restPixelsRef.current = {};
        finishedRef.current = false;
    }, [activePlanes]);

    useEffect(() => {
        let rafId;
        const tick = () => {
            if (!finishedRef.current) {
                const positions = getPositionsRef.current();

                activePlanes.forEach((planeKey) => {
                    if (arrivedRef.current.has(planeKey)) return;

                    const position = positions[planeKey];
                    if (!position) return;

                    const modPixel = pixelOf(position.trackKey, MOD_WAYPOINT);

                    // Planes fly toward MOD from a higher pixel, so arriving means dropping to it
                    if (position.pixel > modPixel + ARRIVAL_TOLERANCE_PX) return;

                    arrivedRef.current.add(planeKey);

                    // One FINISH slot for every plane still inbound behind this one
                    const remaining = activePlanes.length - arrivedRef.current.size;

                    if (remaining > 0) {
                        const waypoint = `FINISH_${remaining}`;
                        restPixelsRef.current[planeKey] = pixelOf(position.trackKey, waypoint);
                        extendRef.current(planeKey, waypoint);
                    } else {
                        restPixelsRef.current[planeKey] = modPixel;
                    }
                });

                // Held open until the planes still gliding out to their slots land,
                // so the level is not called finished with planes still moving
                const everyPlaneArrived =
                    activePlanes.length > 0 && arrivedRef.current.size === activePlanes.length;

                if (everyPlaneArrived && allPlanesAtRest(activePlanes, positions, restPixelsRef.current)) {
                    finishedRef.current = true;
                    onAllRef.current();
                }
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [activePlanes]);

    // Clears arrival order, used when a level is reset or restarted
    const resetFinishTracking = () => {
        arrivedRef.current = new Set();
        restPixelsRef.current = {};
        finishedRef.current = false;
    };

    return { resetFinishTracking };
};
