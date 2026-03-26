import { dbdStorage } from "./streakStorage.js";
import { dbdCore } from "./streakCore.js";
import { dbdUI } from "./streakUI.js";

function refreshUI() {
    const matches = dbdStorage.getMatches();

    dbdUI.renderTable(matches);
    handleRenderStats();
}

function handleSubmitMatch(match) {
    const matches = dbdStorage.addMatch(match);

    updateBestStreak(matches);
    refreshUI();
}

function handleDeleteMatch(index) {
    const matches = dbdStorage.deleteMatch(index);

    updateBestStreak(matches);
    refreshUI();
}

function handleClearMatches() {
    dbdStorage.clearMatches();

    refreshUI();
}

function handleRenderStats() {
    const matches = dbdStorage.getMatches();
    const current = dbdCore.calculateCurrentStreak(matches);
    const storedBest = dbdStorage.getBestStreak();
    const best = Math.max(storedBest, current);

    dbdUI.renderStats({current, best});
}

function handleResetBestStreak() {
    const confirmReset = confirm("Are you sure you want to reset your Best Streak?");
    if(!confirmReset) return;

    const matches = dbdStorage.getMatches();
    const current = dbdCore.calculateCurrentStreak(matches);

    dbdStorage.saveBestStreak(current);

    handleRenderStats();
}

function updateBestStreak(matches) {
    const calculatedBest = dbdCore.calculateBestStreak(matches);
    const storedBest = dbdStorage.getBestStreak();
    const newBest = Math.max(storedBest, calculatedBest);

    dbdStorage.saveBestStreak(newBest);
}

export const dbdController = {
    handleSubmitMatch,
    handleDeleteMatch,
    handleClearMatches,
    handleRenderStats,
    handleResetBestStreak,
    refreshUI
};