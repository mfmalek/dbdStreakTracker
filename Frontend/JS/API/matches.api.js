import { http } from "./http.js";
import { streakCore } from "../Core/Survivor Streak/streakCore.js";

function getContext() {
    return {
        mode: streakCore.MODE,
        groupId: window.currentGroupId || null
    };
}

async function getMatches() {
    const { mode, groupId } = getContext();
    const matches = await http.get("/matches", {
        mode,
        groupId
    });

    return matches.map(m => ({
        id: m.id,
        result: m.result,
        ...(m.data || {})
    }));
}

async function addMatch(match) {
    const { mode, groupId } = getContext();
    await http.post("/matches", {
        mode,
        groupId,
        ...match
    });
    return getMatches();
}

async function deleteMatch(id) {
    await http.del(`/matches/${id}`);
}

async function clearMatches() {
    const { mode, groupId } = getContext();
    await http.del("/matches", { mode, groupId });
}

export const matchesApi = {
    getMatches,
    addMatch,
    deleteMatch,
    clearMatches
};