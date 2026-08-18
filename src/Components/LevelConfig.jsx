import { startingConditions as level1StartingConditions, DEFAULT_SPEED } from "./SimConfig.jsx";

// Radius in px around a plane that no other plane may enter. Any pair closer than
// this to each other has lost separation, whatever tracks they are on.
const DEFAULT_SEPARATION_PX = 34.72;


// PlaneAlpha = AAL12
// PlaneBeta = DAL88
// PlaneGamma = UAL74
// PlaneDelta = SWA23
// PlaneEpsilon = VRD36


// Each level is fully self contained: its own startingConditions (same shape as
// SimConfig's startingConditions), its own separation threshold, and its own ideal time.
export const LEVELS = {
    1: {
        id: 1,
        title: "LEVEL ONE",
        introText: "Level 1",
        startingConditions: level1StartingConditions,
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 45
    },
    2: {
        id: 2,
        title: "LEVEL TWO",
        introText: "Level 2",
        startingConditions: {
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                //switchableTracks: ["track1", "track2"],
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                switchableTracks: ["track3", "track4"],
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 228
    },
    3: {
        id: 3,
        title: "LEVEL THREE",
        introText: "Level 3",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                switchableTracks: ["track1", "track2"],
                startPixel: 747.81 + (17.34 * 2),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                switchableTracks: ["track3", "track4"],
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 210
    },
    4: {
        id: 4,
        title: "LEVEL THREE",
        introText: "Level 3",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 198
    },
    5: {
        id: 5,
        title: "LEVEL FIVE",
        introText: "Level 5",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: "20_MINAH",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: "20_HORIZONTAL",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 138
    },
    6: {
        id: 6,
        title: "LEVEL SIX",
        introText: "Level 6",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 693.98 + 17.34,
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "30_HORIZONTAL",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 198
    },
    7: {
        id: 7,
        title: "LEVEL SEVEN",
        introText: "Level 7",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: "25_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: "25_INIT_DESC",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 187
    },
    8: {
        id: 8,
        title: "LEVEL EIGHT",
        introText: "Level 8",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 518.61 + 17.34,
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "20_LIDAT",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 138
    },
    9: {
        id: 9,
        title: "LEVEL NINE",
        introText: "Level 9",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                switchableTracks: ["track1", "track2"],
                startPixel: 747.81 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                switchableTracks: ["track3", "track4"],
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 210
    },
    10: {
        id: 10,
        title: "LEVEL TEN",
        introText: "Level 10",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                // switchableTracks: ["track1", "track2"],
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694.00 + (17.36*4),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 216
    },
    11: {
        id: 11,
        title: "LEVEL ELEVEN",
        introText: "Level 11",
        startingConditions: {
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 228
    },
    12: {
        id: 12,
        title: "LEVEL TWELVE",
        introText: "Level 12",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                switchableTracks: ["track1", "track2"],
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 690.62 + 17.34,
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 198
    },
    13: {
        id: 13,
        title: "LEVEL THIRTEEN",
        introText: "Level 13",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                switchableTracks: ["track1", "track2"],
                startPixel: 780.91 + 17.34,
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "30_HORIZONTAL",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                switchableTracks: ["track3", "track4"],
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 216
    },
    14: {
        id: 14,
        title: "LEVEL FOURTEEN",
        introText: "Level 14",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                switchableTracks: ["track1", "track2"],
                startPixel: 747.81 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                switchableTracks: ["track3", "track4"],
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 228
    },
    15: {
        id: 15,
        title: "LEVEL FIFTEEN",
        introText: "Level 15",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 693.98 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694.00 + (17.36),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 215
    },
    16: {
        id: 16,
        title: "LEVEL SIXTEEN",
        introText: "Level 16",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 693.98 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694.00 + (17.36*2),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 215
    },
    17: {
        id: 17,
        title: "LEVEL SEVENTEEN",
        introText: "Level 17",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694.00 + (17.36),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 658.31 + (17.34*2),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 215
    },
    18: {
        id: 18,
        title: "LEVEL EIGHTEEN",
        introText: "Level 18",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: 747.81 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "30_HORIZONTAL",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 742.62 + (17.34),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 221
    },
    19: {
        id: 19,
        title: "LEVEL NINETEEN",
        introText: "Level 19",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 693.98 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694 + (17.36 * 3),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 236
    },
    20: {
        id: 20,
        title: "LEVEL TWENTY",
        introText: "Level 20",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: 747.81 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 245
    },
    21: {
        id: 21,
        title: "LEVEL TWENTY ONE",
        introText: "Level 21",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 832.90 + (17.34*2),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    22: {
        id: 22,
        title: "LEVEL TWENTY TWO",
        introText: "Level 22",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: "25_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 607.30 + (17.34),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694.00 + (17.34),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    23: {
        id: 23,
        title: "LEVEL TWENTY THREE",
        introText: "Level 23",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: 747.81 + (17.34 * 2),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    24: {
        id: 24,
        title: "LEVEL TWENTY FOUR",
        introText: "Level 24",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 693.98 + (17.34 * 4),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694.00 + (17.34 * 3),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    25: {
        id: 25,
        title: "LEVEL TWENTY FIVE",
        introText: "Level 25",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "30_HORIZONTAL",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 658.31 + (17.34*2),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    // Four Planes
    26: {
        id: 26,
        title: "LEVEL TWENTY SIX",
        introText: "Level 26",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 607.55 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 607.30 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*14),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694 + (17.34*4),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    27: {
        id: 27,
        title: "LEVEL TWENTY SEVEN",
        introText: "Level 27",
        startingConditions: {
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 607.30 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*13),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 658.31 + (17.34*3),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    28: {
        id: 28,
        title: "LEVEL TWENTY EIGHT",
        introText: "Level 28",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 780.90 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*12),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    29: {
        id: 29,
        title: "LEVEL TWENTY NINE",
        introText: "Level 29",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 780.90 + (17.34),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*16),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    30: {
        id: 30,
        title: "LEVEL THIRTY",
        introText: "Level 30",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "30_HORIZONTAL",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*12),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    31: {
        id: 31,
        title: "LEVEL THIRTY ONE",
        introText: "Level 31",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel:  607.55 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694.00 + (17.36*2),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: "35_START",
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 658.31 + (17.34*2),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    32: {
        id: 32,
        title: "LEVEL THIRTY TWO",
        introText: "Level 32",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  607.30 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel:  747.81 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel:  572.60 + (17.34*12),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 606.31 + (17.34*2),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    33: {
        id: 33,
        title: "LEVEL THIRTY THREE",
        introText: "Level 33",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel:"30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  694 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel:  780.90 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*12),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    34: {
        id: 34,
        title: "LEVEL THIRTY FOUR",
        introText: "Level 34",
        startingConditions: {
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  607.30 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*11),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: 661.12 + (17.34*3),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    // Five Planes
    35: {
        id: 35,
        title: "LEVEL THIRTY FIVE",
        introText: "Level 35",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: 661.12 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  607.30 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*11),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 694 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 519.89 + (17.34*4),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    36: {
        id: 36,
        title: "LEVEL THIRTY SIX",
        introText: "Level 36",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: "25_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  780 + (17.34),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "25_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*9),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 607.30 + (17.34*4),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    37: {
        id: 37,
        title: "LEVEL THIRTY SEVEN",
        introText: "Level 37",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 518.61 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  607.30 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*12),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*8),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 658.31 + (17.34*2),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    38: {
        id: 38,
        title: "LEVEL THIRTY EIGHT",
        introText: "Level 38",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 780.91 + (17.34),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  694 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 606.31 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: "25_HORIZONTAL",
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 607.30 + (17.34*3),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    39: {
        id: 39,
        title: "LEVEL THIRTY NINE",
        introText: "Level 39",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  "30_HORIZONTAL",
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: "30_INIT_DESC",
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*12),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 780.90 + (17.34),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    40: {
        id: 40,
        title: "LEVEL FOURTY",
        introText: "Level 40",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel: 693.98 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  694 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 690.62 + (17.34*3),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*12),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track3",
                startPixel: 780.90 + (17.34),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    41: {
        id: 41,
        title: "LEVEL FOURTY ONE",
        introText: "Level 41",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track2",
                startPixel: 661.12 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  694 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 832.90 + (17.34*1),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*7),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 607.30 + (17.3*3),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
    42: {
        id: 42,
        title: "LEVEL FOURTY TWO",
        introText: "Level 42",
        startingConditions: {
            planeAlpha: {
                planeId: ".plane-alpha",
                color: "00FFFF",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track1",
                startPixel:  607.55 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeBeta: {
                planeId: ".plane-beta",
                color: "00FF7F",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel:  694 + (17.34*4),
                endPixel: "0_MOD"
            },
            planeGamma: {
                planeId: ".plane-gamma",
                color: "FF0000",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track4",
                startPixel: 832.90 + (17.34*2),
                endPixel: "0_MOD"
            },
            planeDelta: {
                planeId: ".plane-delta",
                color: "FFFF00",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track5",
                startPixel: 572.60 + (17.34*17),
                endPixel: "0_MOD"
            },
            planeEpsilon: {
                planeId: ".plane-epsilon",
                color: "800080",
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
                speed: DEFAULT_SPEED,
                ease: "none",

                trackKey: "track6",
                startPixel: 607.30 + (17.3*3),
                endPixel: "0_MOD"
            },
        },
        separationPx: DEFAULT_SEPARATION_PX,
        idealTimeSeconds: 10
    },
};


// TRACK 1
//     "20_MINAH": 518.61,
//     "25_INIT_DESC": 607.55,
//     "30_INIT_DESC": 693.98,
//     "35_START": 780.91

// TRACK 2
//     "20_MINAH": 571.93,
//     "25_INIT_DESC": 661.12,
//     "30_INIT_DESC": 747.81,
//     "35_START": 834.94

// TRACK 3
//     "20_LIDAT": 519.89,
//     "25_INIT_DESC": 606.31,
//     "30_INIT_DESC": 690.62,
//     "35_START": 780.90

// TRACK 4
//     "20_LIDAT": 571.89,
//     "25_INIT_DESC": 658.31,
//     "30_INIT_DESC": 742.62,
//     "35_START": 832.90

// TRACK 5
//     "23_TPH": 572.60,
//     "25_INIT_DESC": 667.65,
//     "30_INIT_DESC": 742.45,
//     "35_START": 869.12

// TRACK 6
//     "23_TPH": 572.60,
//     "25_HORIZONTAL": 607.30,
//     "30_HORIZONTAL": 694.00,
//     "35_START": 780.80















export const DEFAULT_LEVEL_ID = 1;

// Look up a level, falling back to the default level if the id is missing
export const getLevelConfig = (levelId) => LEVELS[levelId] || LEVELS[DEFAULT_LEVEL_ID];

// Id of the level after this one, or null if this is the last level defined
export const getNextLevelId = (levelId) => {
    const nextId = Number(levelId) + 1;
    return LEVELS[nextId] ? nextId : null;
};

// Plane keys active in a level, derived from its startingConditions
export const activePlanesFor = (levelConfig) => Object.keys(levelConfig.startingConditions);
