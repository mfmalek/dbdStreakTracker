function initListeners({
    submitMatch,
    editMatchById,
    cancelEditing,
    deleteMatchById,
    deleteMatchOnClick,
    clearTableMatches,
    resetBestStreak
}) {
    bindSubmit(submitMatch);
    bindEditById(editMatchById);
    bindCancelEdit(cancelEditing);
    bindDeleteById(deleteMatchById);
    bindDeleteOnClick(deleteMatchOnClick);
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

function bindCancelEdit(cancelEditing) {
    document.getElementById("cancelEditButton")?.addEventListener("click", cancelEditing);
}

function bindDeleteById(deleteMatchById) {
    document.getElementById("deleteMatchButton")?.addEventListener("click", deleteMatchById);
}

function bindDeleteOnClick(deleteMatchOnClick) {
    const table = document.getElementById("matchTableBody");

    if (!table) return;

    table.addEventListener("click", async (e) => {
        const btn = e.target.closest(".deleteMatchHoverBtn");

        if (!btn) return;

        const matchId = Number(btn.dataset.matchId);

        await deleteMatchOnClick(matchId);
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