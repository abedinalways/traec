type MatchResult = "win" | "loss";

export const getMaxWinStreak = (history: MatchResult[]): number => {
    let maxStreak = 0;
    let currentStreak = 0;

    for (const result of history) {
        if (result === "win") {
            currentStreak++;
            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
            }
        } else {
            currentStreak = 0;
        }
    }

    return maxStreak;
};
