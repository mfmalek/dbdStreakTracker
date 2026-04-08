import { dbdCore } from "./streakCore.js";
import { auth } from "./auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";
const API_STREAK = `${API_URL}/streak`;

async function getBestStreak() {
    const mode = dbdCore.MODE;
    const groupId = window.currentGroupId;
    let url = `${API_STREAK}?mode=${mode}`;

    if (groupId) {
        url += `&groupId=${groupId}`;
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    });

    if (!res.ok) {
        console.error("Failed to fetch best streak");
        return 0;
    }

    const data = await res.json();
    return data.bestStreak || 0;
}

async function resetBestStreak() {
    const mode = dbdCore.MODE;
    const groupId = window.currentGroupId;

    await fetch(`${API_STREAK}/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`
        },
        body: JSON.stringify({
            mode,
            groupId
        })
    });
}

export const dbdStorageStreaks = {
    getBestStreak,
    resetBestStreak
};