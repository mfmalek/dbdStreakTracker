import { dbdCore } from "./streakCore.js";
import { auth } from "./auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";
const API_MATCHES = `${API_URL}/matches`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`
    };
}

async function getMatches() {
    const mode = dbdCore.MODE;

    const groupId = window.currentGroupId;

    let url = `${API_MATCHES}?mode=${mode}`;

    if (groupId) {
        url += `&groupId=${groupId}`;
    }

    const res = await fetch(url, {
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("GET MATCHES ERROR:", err);
        throw new Error(err);
    }

    const matches = await res.json();

    return matches.map(m => ({
        id: m.id,
        result: m.result,
        ...(m.data || {})
    }));
}

async function addMatch(match) {
    const mode = dbdCore.MODE;
    const groupId = window.currentGroupId;

    const res = await fetch(API_MATCHES, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            mode,
            ...match,
            groupId
        })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("ADD MATCH ERROR:", err);
        throw new Error(err);
    }

    return await getMatches();
}

async function deleteMatch(id) {
    const res = await fetch(`${API_MATCHES}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("DELETE MATCH ERROR:", err);
        throw new Error(err);
    }
}

async function clearMatches() {
    const mode = dbdCore.MODE;
    const groupId = window.currentGroupId;
    let url = `${API_MATCHES}?mode=${mode}`;

    if (groupId) {
        url += `&groupId=${groupId}`;
    }

    const res = await fetch(url, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("CLEAR MATCHES ERROR:", err);
        throw new Error(err);
    }
}

export const dbdStorageMatches = {
    getMatches,
    addMatch,
    deleteMatch,
    clearMatches,
};