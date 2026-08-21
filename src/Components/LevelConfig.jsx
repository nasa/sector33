// This script houses all the level setup with #Planes, Starting Location, Colors, Tracks, Clouds, ETC.
import { DEFAULT_SPEED } from "./SimConfig.jsx";
const DEFAULT_SEPARATION_PX = 34.72;

const PLANES = {
    alpha:   { callsign: "AAL12", planeId: ".plane-alpha",   color: "00FFFF" },
    beta:    { callsign: "DAL88", planeId: ".plane-beta",    color: "00FF00" },
    gamma:   { callsign: "UAL74", planeId: ".plane-gamma",   color: "ef483f" },
    delta:   { callsign: "SWA23", planeId: ".plane-delta",   color: "FFFF00" },
    epsilon: { callsign: "VRD36", planeId: ".plane-epsilon", color: "EE82EE" }
};

const PLANE_DEFAULTS = {
    endPixel: "0_MOD",
    speed: DEFAULT_SPEED,
    ease: "none",
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
};

// For displaying the level name easily
const ONES = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN",
    "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
const TENS = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];

const numberWord = (n) =>
    n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? " " + ONES[n % 10] : ""}`;


// Expanding the compact plane entry into a full config that is readable
const buildPlane = (name, spec) => ({
    ...PLANE_DEFAULTS,
    ...PLANES[name],
    trackKey: spec.track,
    startPixel: spec.start,
    ...(spec.switchable && { switchableTracks: spec.switchable }),
    ...(spec.end && { endPixel: spec.end })
});

// Turn a table row into the level that is readable
const buildLevel = (id, { idealTime, planes }) => {
    const startingConditions = {};
    Object.entries(planes).forEach(([name, spec]) => {
        startingConditions[`plane${name[0].toUpperCase()}${name.slice(1)}`] = buildPlane(name, spec);
    });

    return {
        id,
        title: `LEVEL ${numberWord(id)}`,
        introText: `Level ${id}`,
        startingConditions,
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: idealTime
    };
};

// Every level is within this level table and is turned into the levels from the above functions.

// Dev: To add a new level the id is key, idealTime is the target time for a perfect score
//      Each start point has its own name with breakpoint map tied to it from PathSVGs script
//      The numbers added onto it represent the extra ticks not on sections of 5
//      Switchable allows the plane to swap between the selected tracks
//      If a plane is on tracks 1,2,3,4 and doesn't have "switchable" then there is a storm placed on the path not used.

const LEVEL_TABLE = {
     1: { idealTime: 200, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC",    switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL+3"},
    }},
     2: { idealTime: 230, planes: {
        beta:    { track: "track6", start: "35_START" },
        gamma:   { track: "track3", start: "35_START",        switchable: ["track3", "track4"] }
    }},
     3: { idealTime: 212, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC+2",  switchable: ["track1", "track2"] },
        beta:    { track: "track3", start: "35_START",        switchable: ["track3", "track4"] }
    }},
     4: { idealTime: 198, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC" },
        gamma:   { track: "track3", start: "30_INIT_DESC" }
    }},
     5: { idealTime: 139, planes: {
        alpha:   { track: "track1", start: "20_MINAH" },
        beta:    { track: "track5", start: "20_HORIZONTAL" }
    }},
     6: { idealTime: 200, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC+1" },
        beta:    { track: "track6", start: "30_HORIZONTAL" }
    }},
     7: { idealTime: 187, planes: {
        alpha:   { track: "track2", start: "25_INIT_DESC" },
        gamma:   { track: "track4", start: "25_INIT_DESC" }
    }},
     8: { idealTime: 139, planes: {
        alpha:   { track: "track1", start: "20_MINAH+1" },
        gamma:   { track: "track3", start: "20_LIDAT" }
    }},
     9: { idealTime: 243, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC+2",  switchable: ["track1", "track2"] },
        gamma:   { track: "track4", start: "35_START",        switchable: ["track3", "track4"] }
    }},
    10: { idealTime: 217, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC" },
        beta:    { track: "track6", start: "30_HORIZONTAL+4" }
    }},
    11: { idealTime: 230, planes: {
        beta:    { track: "track6", start: "35_START" },
        gamma:   { track: "track3", start: "35_START" }
    }},
    12: { idealTime: 199, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC",    switchable: ["track1", "track2"] },
        gamma:   { track: "track3", start: "30_INIT_DESC+1" }
    }},
    13: { idealTime: 250, planes: {
        alpha:   { track: "track2", start: "35_START+1",      switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL" },
        gamma:   { track: "track3", start: "30_INIT_DESC",    switchable: ["track3", "track4"] }
    }},
    14: { idealTime: 229, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC+2",  switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "35_START" },
        gamma:   { track: "track3", start: "35_START",        switchable: ["track3", "track4"] }
    }},
    15: { idealTime: 217, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC+4" },
        beta:    { track: "track6", start: "30_HORIZONTAL+1" },
        gamma:   { track: "track3", start: "30_INIT_DESC" }
    }},
    16: { idealTime: 217, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC+4" },
        beta:    { track: "track6", start: "30_HORIZONTAL+2" },
        gamma:   { track: "track3", start: "30_INIT_DESC" }
    }},
    17: { idealTime: 217, planes: {
        alpha:   { track: "track1", start: "35_START" },
        beta:    { track: "track6", start: "30_HORIZONTAL+1" },
        gamma:   { track: "track4", start: "25_INIT_DESC+2" }
    }},
    18: { idealTime: 217, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC+3" },
        beta:    { track: "track6", start: "30_HORIZONTAL" },
        gamma:   { track: "track4", start: "30_INIT_DESC+1",        switchable: ["track3", "track4"] }
    }},
    19: { idealTime: 217, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC+3" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL+3" },
        gamma:   { track: "track4", start: "30_INIT_DESC" ,        switchable: ["track3", "track4"] }
    }},
    20: { idealTime: 229, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC+2" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "35_START" },
        gamma:   { track: "track3", start: "35_START" }
    }},
    21: { idealTime: 255, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC" },
        beta:    { track: "track6", start: "35_START" },
        gamma:   { track: "track4", start: "35_START+2" ,        switchable: ["track3", "track4"] }
    }},
    22: { idealTime: 187, planes: {
        alpha:   { track: "track2", start: "25_INIT_DESC" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "25_HORIZONTAL+1" },
        delta:   { track: "track6", start: "30_HORIZONTAL+1" }
    }},
    23: { idealTime: 247, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC+2" },
        beta:    { track: "track6", start: "35_START" },
        gamma:   { track: "track3", start: "35_START" }
    }},
    24: { idealTime: 217, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC+4" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL+3" },
        gamma:   { track: "track4", start: "30_INIT_DESC" ,        switchable: ["track3", "track4"] }
    }},
    25: { idealTime: 217, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC" },
        beta:    { track: "track6", start: "30_HORIZONTAL" },
        gamma:   { track: "track4", start: "25_INIT_DESC+2" }
    }},
    26: { idealTime: 223, planes: {
        alpha:   { track: "track1", start: "25_INIT_DESC+3" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "25_HORIZONTAL+4" },
        gamma:   { track: "track5", start: "23_TPH+14" },
        delta:   { track: "track6", start: "30_HORIZONTAL+4" }
    }},
    27: { idealTime: 223, planes: {
        beta:    { track: "track6", start: "25_HORIZONTAL+4" },
        gamma:   { track: "track5", start: "23_TPH+14" },
        delta:   { track: "track6", start: "30_HORIZONTAL+4" },
        epsilon: { track: "track4", start: "25_INIT_DESC+3" ,        switchable: ["track3", "track4"] }
    }},
    28: { idealTime: 235, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL+3" },
        gamma:   { track: "track3", start: "35_START+2" },
        delta:   { track: "track5", start: "23_TPH+12" }
    }},
    29: { idealTime: 235, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL+3" },
        gamma:   { track: "track3", start: "35_START+1" },
        delta:   { track: "track5", start: "23_TPH+16" }
    }},
    30: { idealTime: 235, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL" },
        gamma:   { track: "track3", start: "30_INIT_DESC" },
        delta:   { track: "track5", start: "23_TPH+12" ,        switchable: ["track3", "track4"] }
    }},
    31: { idealTime: 243, planes: {
        alpha:   { track: "track1", start: "25_INIT_DESC+4" },
        beta:    { track: "track6", start: "30_HORIZONTAL+2" },
        gamma:   { track: "track4", start: "35_START" ,        switchable: ["track3", "track4"] },
        delta:   { track: "track4", start: "25_INIT_DESC+2" ,        switchable: ["track3", "track4"] }
    }},
    32: { idealTime: 217, planes: {
        alpha:   { track: "track6", start: "25_HORIZONTAL+4" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track2", start: "30_INIT_DESC+2" },
        gamma:   { track: "track5", start: "23_TPH+12" },
        delta:   { track: "track3", start: "25_INIT_DESC+2" }
    }},
    33: { idealTime: 253, planes: {
        alpha:   { track: "track2", start: "30_INIT_DESC" },
        beta:    { track: "track6", start: "30_HORIZONTAL+3" },
        gamma:   { track: "track3", start: "35_START+2" },
        delta:   { track: "track5", start: "23_TPH+12" }
    }},
    34: { idealTime: 223, planes: {
        beta:    { track: "track6", start: "25_HORIZONTAL+4" },
        gamma:   { track: "track5", start: "23_TPH+11" },
        delta:   { track: "track6", start: "30_HORIZONTAL+4" },
        epsilon: { track: "track2", start: "25_INIT_DESC+3" ,        switchable: ["track1", "track2"] }
    }},
    35: { idealTime: 217, planes: {
        alpha:   { track: "track2", start: "25_INIT_DESC+2" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "25_HORIZONTAL+4" },
        gamma:   { track: "track5", start: "23_TPH+11" },
        delta:   { track: "track6", start: "30_HORIZONTAL+3" },
        epsilon: { track: "track3", start: "20_LIDAT+4" }
    }},
    36: { idealTime: 223, planes: {
        alpha:   { track: "track1", start: "25_INIT_DESC" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "35_START+1" },
        gamma:   { track: "track3", start: "25_INIT_DESC" },
        delta:   { track: "track5", start: "23_TPH+9" },
        epsilon: { track: "track6", start: "25_HORIZONTAL+4" }
    }},
    37: { idealTime: 217, planes: {
        alpha:   { track: "track1", start: "20_MINAH+4" },
        beta:    { track: "track6", start: "25_HORIZONTAL+4" },
        gamma:   { track: "track5", start: "23_TPH+12" },
        delta:   { track: "track5", start: "23_TPH+8" },
        epsilon: { track: "track4", start: "25_INIT_DESC+2" ,        switchable: ["track3", "track4"] }
    }},
    38: { idealTime: 223, planes: {
        alpha:   { track: "track1", start: "35_START+1" },
        beta:    { track: "track6", start: "30_HORIZONTAL+4" },
        gamma:   { track: "track4", start: "25_INIT_DESC+4" ,        switchable: ["track3", "track4"] },
        delta:   { track: "track6", start: "25_HORIZONTAL" },
        epsilon: { track: "track6", start: "25_HORIZONTAL+3" }
    }},
    39: { idealTime: 253, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC" ,        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL" },
        gamma:   { track: "track3", start: "30_INIT_DESC" },
        delta:   { track: "track5", start: "23_TPH+12" },
        epsilon: { track: "track3", start: "35_START+1" }
    }},
    40: { idealTime: 271, planes: {
        alpha:   { track: "track1", start: "30_INIT_DESC+3",        switchable: ["track1", "track2"] },
        beta:    { track: "track6", start: "30_HORIZONTAL+4" },
        gamma:   { track: "track3", start: "30_INIT_DESC+3" },
        delta:   { track: "track5", start: "23_TPH+12" },
        epsilon: { track: "track3", start: "35_START+1" }
    }},
    41: { idealTime: 240, planes: {
        alpha:   { track: "track2", start: "25_INIT_DESC+2" },
        beta:    { track: "track6", start: "30_HORIZONTAL+4" },
        gamma:   { track: "track4", start: "35_START+1" },
        delta:   { track: "track5", start: "23_TPH+7" },
        epsilon: { track: "track6", start: "25_HORIZONTAL+3" }
    }},
    42: { idealTime: 240, planes: {
        alpha:   { track: "track1", start: "25_INIT_DESC+4" },
        beta:    { track: "track6", start: "30_HORIZONTAL+4" },
        gamma:   { track: "track4", start: "35_START+2" ,        switchable: ["track3", "track4"] },
        delta:   { track: "track5", start: "23_TPH+17" },
        epsilon: { track: "track6", start: "25_HORIZONTAL+3" }
    }},
};

// Collect levels and put onto display

export const LEVELS = Object.fromEntries(
    Object.entries(LEVEL_TABLE).map(([id, definition]) => [id, buildLevel(Number(id), definition)])
);

export const DEFAULT_LEVEL_ID = 1;

export const LEVEL_IDS = Object.keys(LEVEL_TABLE).map(Number).sort((a, b) => a - b);
export const getLevelConfig = (levelId) => LEVELS[levelId] || LEVELS[DEFAULT_LEVEL_ID];
export const getNextLevelId = (levelId) => {
    const nextId = Number(levelId) + 1;
    return LEVELS[nextId] ? nextId : null;
};

// Active planes in the level
export const activePlanesFor = (levelConfig) => Object.keys(levelConfig.startingConditions);

// Route pairs that have a switchable option
const ROUTE_PAIRS = [["track1", "track2"], ["track3", "track4"]];

// Storm for blocked paths
export const blockedTracksFor = (levelConfig) => {
    const flown = new Set();
    const reachable = new Set();

    Object.values(levelConfig.startingConditions).forEach((plane) => {
        flown.add(plane.trackKey);
        reachable.add(plane.trackKey);
        (plane.switchableTracks || []).forEach((trackKey) => reachable.add(trackKey));
    });

    const blocked = [];
    ROUTE_PAIRS.forEach((pair) => {
        pair.forEach((trackKey, index) => {
            const partner = pair[1 - index];
            if (flown.has(partner) && !reachable.has(trackKey)) blocked.push(trackKey);
        });
    });

    return blocked;
};

// Waypoint reference for authoring start points above
// TRACK 1  20_MINAH 518.61  25_INIT_DESC 607.55  30_INIT_DESC 693.98  35_START 780.91
// TRACK 2  20_MINAH 571.93  25_INIT_DESC 661.12  30_INIT_DESC 747.81  35_START 834.94
// TRACK 3  20_LIDAT 519.89  25_INIT_DESC 606.31  30_INIT_DESC 690.62  35_START 780.90
// TRACK 4  20_LIDAT 571.89  25_INIT_DESC 658.31  30_INIT_DESC 742.62  35_START 832.90
// TRACK 5  23_TPH   572.60  25_INIT_DESC 667.65  30_INIT_DESC 742.45  35_START 869.12
// TRACK 6  23_TPH   572.60  25_HORIZONTAL 607.30 30_HORIZONTAL 694.00 35_START 780.80
