import { createBaseController } from "../Core Streak/baseController.js";
import { sharedStatsUI } from "../UI/SharedUI/sharedStatsUI.js";
import { killerUI } from "../UI/KillerUI/killerUI.js";
import { matchesApi } from "../../API/matches.api.js";

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