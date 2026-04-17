import { dbdCore } from "./streakCore.js";
import { auth } from "./auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";
const API_STREAK = `${API_URL}/streak`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`
    };
}

async function getBestStreak() {
    const mode = dbdCore.MODE;
    const groupId = window.currentGroupId;
    let url = `${API_STREAK}?mode=${mode}`;

    if (groupId) {
        url += `&groupId=${groupId}`;
    }

    const res = await fetch(url, {
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("GET BEST STREAK ERROR:", err);
        throw new Error(err);
    }
    const data = await res.json();
    return data.bestStreak || 0;
}

async function resetBestStreak() {
    const mode = dbdCore.MODE;
    const groupId = window.currentGroupId;
    const res = await fetch(`${API_STREAK}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            mode,
            groupId
        })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("RESET BEST STREAK ERROR:", err);
        throw new Error(err);
    }
}

export const dbdStorageStreaks = {
    getBestStreak,
    resetBestStreak
};