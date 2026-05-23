function renderStats({ current, best }) {
    const ongoingStreak = document.getElementById("currentStreak");
    const streakRecord = document.getElementById("bestStreak");
    if (!ongoingStreak || !streakRecord) return;
    ongoingStreak.textContent = current;
    streakRecord.textContent = best;
}

export const sharedUI = {
    renderStats
};