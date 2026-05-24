import { createBaseController } from "../Core Streak/baseController.js";
import { sharedUI } from "../Core Streak/sharedUI.js";
import { killerUI } from "./killerUI.js";
import { matchesApi } from "../../API/matches.api.js";

const baseKiller = createBaseController({
    renderTable: killerUI.renderTable,
    renderStats: sharedUI.renderStats
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