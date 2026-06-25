import { matchesApi } from "../../../api/matches.js";
import { baseController } from "../../shared-streak/index.js";
import { sharedStatsUI } from "../../shared-streak/index.js";
import { killerUI } from "../ui/killer.ui.js";

const baseKiller = baseController.createBaseController({
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