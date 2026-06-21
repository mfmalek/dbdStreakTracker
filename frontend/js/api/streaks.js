import { http } from "./http.client.js";
import { streakContext } from "../core/utils/streak.context.js";
import { sharedCore } from "../core/streak/shared.core.js";

function getContext() {
    const { role, killerName } = streakContext.getContext();

    return {
        mode: sharedCore.MODE,
        role,
        killerName,
        groupId: window.currentGroupId || null
    };
}

async function getBestStreak() {
    const data = await http.get("/streak", getContext());
    return data.bestStreak || 0;
}

async function resetBestStreak() {
    const { mode, role, killerName, groupId } = getContext();
    await http.del("/streak", null, {
        mode,
        role,
        killerName,
        groupId
    });
}

export const streaksApi = {
    getBestStreak,
    resetBestStreak
};