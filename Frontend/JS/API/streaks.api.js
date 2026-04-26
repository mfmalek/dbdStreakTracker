import { http } from "./http.js";
import { streakCore } from "../Core/Streak/streakCore.js";

function getContext() {
    return {
        mode: streakCore.MODE,
        role: "survivor",
        killerName: null,
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