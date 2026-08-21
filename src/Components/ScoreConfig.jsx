// This script calculated the outcome of the level (i.e. the users score once finished)

export const SCORE_TIER = {
    PERFECT: "perfect",
    SUCCESS: "success",
    FAILURE: "failure"
};

const TIER_LABELS = {
    [SCORE_TIER.PERFECT]: "Perfect run",
    [SCORE_TIER.SUCCESS]: "Level complete",
    [SCORE_TIER.FAILURE]: "Separation lost"
};

// Only three possible outcomes with perfect being lined up in perfect time, passing lined up not with best time, and fail with planes colliding or too close
export const evaluateScore = ({ completed, everTooClose, elapsedSeconds, idealTimeSeconds }) => {
    if (everTooClose) {
        return {
            tier: SCORE_TIER.FAILURE,
            label: TIER_LABELS[SCORE_TIER.FAILURE],
            elapsedSeconds,
            idealTimeSeconds
        };
    }
    if (!completed) return null;

    const tier = elapsedSeconds <= idealTimeSeconds ? SCORE_TIER.PERFECT : SCORE_TIER.SUCCESS;
    return { tier, label: TIER_LABELS[tier], elapsedSeconds, idealTimeSeconds };
};
