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

async function getMatches() {
    const { mode, role, killerName, groupId } = getContext();
    const matches = await http.get("/matches", {
        mode,
        role,
        killerName,
        groupId
    });

    return matches.map(m => ({
        id: m.id,
        result: m.result,
        ...(m.data || {})
    }));
}

async function addMatch(match) {
    const { mode, role, killerName, groupId } = getContext();
    await http.post("/matches", {
        mode,
        role,
        killerName,
        groupId,
        ...match
    });
    return getMatches();
}

async function deleteMatch(id) {
    await http.del(`/matches/${id}`);
}

async function clearMatches() {
    const { mode, role, killerName, groupId } = getContext();
    await http.del("/matches", { mode, role, killerName, groupId });
}

export const matchesApi = {
    getMatches,
    addMatch,
    deleteMatch,
    clearMatches
};