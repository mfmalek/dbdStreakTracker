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

    const res = await fetch(`${API_MATCHES}?mode=${mode}`, {
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    });

    if (!res.ok) {
        console.error("API ERROR:", await res.text());
        return [];
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

    await fetch(API_MATCHES, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            mode,
            ...match
        })
    });

    return await getMatches();
}

async function deleteMatch(id) {
    await fetch(`${API_MATCHES}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    });
}

async function clearMatches() {
    const mode = dbdCore.MODE;

    await fetch(`${API_MATCHES}?mode=${mode}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    });
}

export const dbdStorageMatches = {
    getMatches,
    addMatch,
    deleteMatch,
    clearMatches,
};