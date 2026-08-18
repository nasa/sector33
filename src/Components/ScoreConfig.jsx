// Scores a completed level run against its level config

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

// completed - true once every plane has reached its endpoint
// everTooClose - sticky flag from useCollisionTracking, true if any pair ever crossed separationPx
// elapsedSeconds - real time taken to fly the level
// idealTimeSeconds - the level's target time for a perfect score
// Too close always fails the run regardless of time, matching real separation rules.
export const evaluateScore = ({ completed, everTooClose, elapsedSeconds, idealTimeSeconds }) => {
    if (everTooClose) {
        return { tier: SCORE_TIER.FAILURE, label: TIER_LABELS[SCORE_TIER.FAILURE], elapsedSeconds };
    }
    if (!completed) return null;

    const tier = elapsedSeconds <= idealTimeSeconds ? SCORE_TIER.PERFECT : SCORE_TIER.SUCCESS;
    return { tier, label: TIER_LABELS[tier], elapsedSeconds };
};
