function renderStats({ current, best }) {
    const ongoingStreak = document.getElementById("currentStreak");
    const streakRecord = document.getElementById("bestStreak");
    if (!ongoingStreak || !streakRecord) return;
    ongoingStreak.textContent = current;
    streakRecord.textContent = best;
}

function setupHoverDeleteButtons(onDelete) {
    const buttons = document.querySelectorAll(".deleteMatchHoverBtn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const matchId = Number(btn.dataset.matchId);

            onDelete(matchId);
        });
    });
}

export const sharedUI = {
    renderStats,
    setupHoverDeleteButtons
};