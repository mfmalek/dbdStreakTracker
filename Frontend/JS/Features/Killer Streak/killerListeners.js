function initListeners({
    submitMatch,
    deleteTableMatch,
    deleteMatchById,
    clearTableMatches,
    resetBestStreak
}) {
    bindSubmit(submitMatch);
    bindDelete(deleteTableMatch);
    bindDeleteById(deleteMatchById);
    bindClear(clearTableMatches);
    bindResetBest(resetBestStreak);
}

function bindSubmit(submitMatch) {
    document.getElementById("submitMatchButton")?.addEventListener("click", submitMatch);
}

function bindDelete(deleteTableMatch) {
    document.getElementById("deleteMatchButton")?.addEventListener("click", deleteTableMatch);
}

function bindDeleteById(deleteMatchById) {
    const table = document.getElementById("matchTableBody");

    if (!table) return;

    table.addEventListener("click", async (e) => {
        const btn = e.target.closest(".deleteMatchHoverBtn");

        if (!btn) return;

        const matchId = Number(btn.dataset.matchId);

        await deleteMatchById(matchId);
    });
}

function bindClear(clearTableMatches) {
    document.getElementById("clearMatchesButton")?.addEventListener("click", clearTableMatches);
}

function bindResetBest(resetBestStreak) {
    document.getElementById("resetBestStreakButton")?.addEventListener("click", resetBestStreak);
}

export const killerListeners = {
    initListeners
};