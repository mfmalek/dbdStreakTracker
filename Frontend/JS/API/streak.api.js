import { http } from "./http.js";
import { dbdCore } from "../Core/Survivor Streak/streakCore.js";

function getContext() {
    return {
        mode: dbdCore.MODE,
        groupId: window.currentGroupId || null
    };
}

async function getBestStreak() {
    const data = await http.get("/streak", getContext());
    return data.bestStreak || 0;
}

async function resetBestStreak() {
    const { mode, groupId } = getContext();

    await http.del("/streak", null, {
        mode,
        groupId
    });
}

export const dbdStorageStreaks = {
    getBestStreak,
    resetBestStreak
};