function initListeners({
    submitMatch,
    editMatchById,
    deleteTableMatch,
    deleteMatchById,
    clearTableMatches,
    resetBestStreak
}) {
    bindSubmit(submitMatch);
    bindEditById(editMatchById);
    bindDelete(deleteTableMatch);
    bindDeleteById(deleteMatchById);
    bindClear(clearTableMatches);
    bindResetBest(resetBestStreak);
}

function bindSubmit(submitMatch) {
    document.getElementById("submitMatchButton")?.addEventListener("click", submitMatch);
}

function bindEditById(editMatchById) {
    const table = document.getElementById("matchTableBody");

    if (!table) return;

    table.addEventListener("click", async (e) => {
        const btn = e.target.closest(".editMatchHoverBtn");

        if (!btn) return;

        const matchId = Number(btn.dataset.matchId);

        await editMatchById(matchId);
    });
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