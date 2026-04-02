import { dbdCore } from "./streakCore.js";
import { auth } from "./auth.js";

const API_URL = "http://localhost:3000/api";
const API_STREAK = `${API_URL}/streak`;

async function getBestStreak() {
    const mode = dbdCore.MODE;

    const res = await fetch(`${API_STREAK}?mode=${mode}`, {
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

    await fetch(`${API_STREAK}?mode=${mode}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    });
}

export const dbdStorageStreaks = {
    getBestStreak,
    resetBestStreak
};