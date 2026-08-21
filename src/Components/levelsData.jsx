// This script displays the levels in the level selection screen
import { LEVELS, LEVEL_IDS } from "./LevelConfig.jsx";

// 4 difficulties with Easy - Hard separated by color
export const DIFFICULTY_TIERS = {
    2: { planeCount: 2, label: "Easy", swatch: "bg-dv-green", text: "text-dv-green", border: "border-dv-green", bg: "hover:bg-dv-green/25" },
    3: { planeCount: 3, label: "Medium", swatch: "bg-dv-blue", text: "text-dv-blue", border: "border-dv-blue", bg: "hover:bg-dv-blue/25" },
    4: { planeCount: 4, label: "Difficult", swatch: "bg-dv-amber", text: "text-dv-amber", border: "border-dv-amber", bg: "hover:bg-dv-amber/25" },
    5: { planeCount: 5, label: "Hard", swatch: "bg-dv-red", text: "text-dv-red", border: "border-dv-red", bg: "hover:bg-dv-red/25" }
};

export const LEVELS_DATA = LEVEL_IDS.map((id) => {
    const planeCount = Object.keys(LEVELS[id].startingConditions).length;

    return {
        id,
        title: LEVELS[id].title,
        planeCount,
        ...DIFFICULTY_TIERS[planeCount]
    };
});
