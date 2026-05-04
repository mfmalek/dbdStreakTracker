function initListeners({ submitMatch, deleteTableMatch, clearTableMatches, resetBestStreak }) {
    bindSubmit(submitMatch);
    bindDelete(deleteTableMatch);
    bindClear(clearTableMatches);
    bindResetBest(resetBestStreak);
}

function bindSubmit(submitMatch) {
    document.getElementById("submitMatchButton")?.addEventListener("click", submitMatch);
}

function bindDelete(deleteTableMatch) {
    document.getElementById("deleteMatchButton")?.addEventListener("click", deleteTableMatch);
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