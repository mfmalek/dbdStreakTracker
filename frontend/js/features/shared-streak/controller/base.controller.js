import { matchesApi } from "../../../api/matches.js";
import { streaksApi } from "../../../api/streaks.js";
import { sharedCore } from "../../../core/streak/shared.core.js";

function createBaseController({ renderTable, renderStats , refreshTable }) {
    async function refreshUI() {
        if (refreshTable) {
            await refreshTable();
        } else {
            const matches = await matchesApi.getMatches();
            renderTable(matches);
        }

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

export const baseController = {
    createBaseController
};