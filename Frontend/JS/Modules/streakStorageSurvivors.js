import { dbdCore } from "./streakCore.js";
import { auth } from "../Auth/auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";
const API_SURVIVORS = `${API_URL}/survivors`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`
    };
}

async function getSurvivorConfigs() {
    const mode = dbdCore.MODE;
    const res = await fetch(`${API_SURVIVORS}?mode=${mode}`, {
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("GET SURVIVOR CONFIGS ERROR:", err);
        throw new Error(err);
    }

    const data = await res.json();

    return data.map(c => ({
        name: c.name,
        image: c.image
    }));
}

async function saveSurvivorConfigs(configs) {
    const mode = dbdCore.MODE;

    const res = await fetch(API_SURVIVORS, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ mode, configs })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("SAVE SURVIVOR CONFIGS ERROR:", err);
        throw new Error(err);
    }
}

export const dbdStorageSurvivors = {
    getSurvivorConfigs,
    saveSurvivorConfigs
};