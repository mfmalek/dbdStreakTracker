import { matchesApi } from "../../API/matches.api.js";
import { streaksApi } from "../../API/streaks.api.js";
import { sharedCore } from "../../Core/Streak/shared.core.js";

export function createBaseController({ renderTable, renderStats }) {
    async function refreshUI() {
        const matches = await matchesApi.getMatches();
        renderTable(matches);
        await handleRenderStats();
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
        renderStats({ current, best });
    }

    return {
        refreshUI,
        handleSubmitMatch,
        handleDeleteMatch,
        handleClearMatches,
        handleResetBestStreak,
        handleRenderStats
    };
}