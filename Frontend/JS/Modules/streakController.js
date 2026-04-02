import { dbdStorageSurvivors } from "./streakStorageSurvivors.js";
import { dbdStorageMatches } from "./streakStorageMatches.js";
import { dbdStorageStreaks } from "./streakStorageStreaks.js";
import { dbdCore } from "./streakCore.js";
import { dbdUI } from "./streakUI.js";

async function refreshUI() {
    const matches = await dbdStorageMatches.getMatches();

    dbdUI.renderTable(matches);
    handleRenderStats();
}

async function handleSaveConfigs(configs) {
    await dbdStorageSurvivors.saveSurvivorConfigs(configs);
    await dbdUI.renderTitle();
    await dbdUI.renderTableHeader();
}

async function handleSubmitMatch(match) {
    await dbdStorageMatches.addMatch(match);
    await refreshUI();
}

async function handleDeleteMatch(matchId) {
    await dbdStorageMatches.deleteMatch(matchId);
    await refreshUI();
}

async function handleClearMatches() {
    await dbdStorageMatches.clearMatches();

    await refreshUI();
}

async function handleResetBestStreak() {
    const confirmReset = confirm("Are you sure you want to reset your Best Streak?");
    if (!confirmReset) return;

    await dbdStorageStreaks.resetBestStreak();
    await refreshUI();
}

async function handleRenderStats() {
    const matches = await dbdStorageMatches.getMatches();
    const current = dbdCore.calculateCurrentStreak(matches);
    const best = await dbdStorageStreaks.getBestStreak();

    dbdUI.renderStats({ current, best });
}

export const dbdController = {
    refreshUI,
    handleSaveConfigs,
    handleSubmitMatch,
    handleDeleteMatch,
    handleClearMatches,
    handleResetBestStreak,
    handleRenderStats
};