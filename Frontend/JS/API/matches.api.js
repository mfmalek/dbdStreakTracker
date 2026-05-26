import { http } from "./http.client.js";
import { sharedCore } from "../Core/Streak/shared.core.js";
import { streakContext } from "../Core/Utils/streak.context.js";

function getContext() {
    const { role, killerName } = streakContext.getContext();

    return {
        mode: sharedCore.MODE,
        role,
        killerName,
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
        killerName: m.killerName,
        ...(m.data || {})
    }));
}

async function addMatch(match) {
    const { mode, role, killerName, groupId } = getContext();
    const created = await http.post("/matches", {
        mode,
        role,
        killerName,
        groupId,
        ...match
    });

    return {
        id: created.id,
        result: created.result,
        killerName: created.killerName,
        ...(created.data || {})
    };
}

async function updateMatch(id, match) {
    const updated = await http.put(`/matches/${id}`, match);

    return {
        id: updated.id,
        result: updated.result,
        killerName: updated.killerName,
        ...(updated.data || {})
    };
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
    updateMatch,
    deleteMatch,
    clearMatches
};