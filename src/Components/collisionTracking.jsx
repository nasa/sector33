// Track Distances between all active planes and display warning if within close range
// This script will track all active planes and their respective distances between each other
import {getPlanePositions, useTrackSwitching} from "./TrackSwitching.jsx";
import {useState} from "react";

// Needs active planes and their positions
export const collisionTracking = (planeConfig) => {
    // Simple Bool state if planes ever got too close (stays active)
    const [x1, x2] = useState({});

    // Second bool state for warning display (can deactivate once not close)
    const [y1, y2] = useState({});

    const {
        getPlanePositions
    } = useTrackSwitching({ activePlanes, timelineRef, pathRefs });


    // return states of warning and got too close
    return {
        // tstszxts
    };
};



