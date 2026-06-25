import { matchesApi } from "../../../api/matches.js";
import { createBaseController } from "../../core-streak/base.controller.js";
import { sharedStatsUI } from "../../ui/shared/shared.stats.ui.js";
import { killerUI } from "../ui/killer.ui.js";

const baseKiller = createBaseController({
    renderTable: killerUI.renderTable,
    renderStats: sharedStatsUI.renderStats
});

async function handleEditMatch(matchId, updatedMatch) {
    await matchesApi.updateMatch(matchId, updatedMatch);

    const matches = await matchesApi.getMatches();

    await baseKiller.refreshUI();
}

export const killerController = {
    ...baseKiller,
    handleEditMatch
};