import { survivorsApi } from "../../API/survivors.api.js";
import { matchesApi } from "../../API/matches.api.js";
import { streaksApi } from "../../API/streaks.api.js";
import { sharedCore } from "../../Core/Streak/sharedCore.js";
import { streakUI } from "./streakUI.js";

async function refreshUI() {
    const matches = await matchesApi.getMatches();
    streakUI.renderTable(matches);
    handleRenderStats();
}

async function handleSaveConfigs(configs) {
    await survivorsApi.saveSurvivorConfigs(configs);
    await streakUI.renderTitle();
    await streakUI.renderTableHeader();
}

async function handleSubmitMatch(match) {
    await matchesApi.addMatch(match);
    await refreshUI();
}

async function handleDeleteMatch(matchId) {
    await matchesApi.deleteMatch(matchId);
    await refreshUI();
}

async function handleClearMatches() {
    await matchesApi.clearMatches();
    await refreshUI();
}

async function handleResetBestStreak() {
    const confirmReset = confirm("Are you sure you want to reset your Best Streak?");
    if (!confirmReset) return;
    await streaksApi.resetBestStreak();
    await refreshUI();
}

async function handleRenderStats() {
    const matches = await matchesApi.getMatches();
    const current = sharedCore.calculateCurrentStreak(matches);
    const best = await streaksApi.getBestStreak();
    streakUI.renderStats({ current, best });
}

export const streakController = {
    refreshUI,
    handleSaveConfigs,
    handleSubmitMatch,
    handleDeleteMatch,
    handleClearMatches,
    handleResetBestStreak,
    handleRenderStats
};