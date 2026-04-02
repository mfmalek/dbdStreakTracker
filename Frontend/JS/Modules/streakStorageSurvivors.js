import { dbdCore } from "./streakCore.js";
import { auth } from "./auth.js";

const API_URL = "http://localhost:3000/api";
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
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    });
    
    const data = await res.json();

    return data.map(c => ({
        name: c.name,
        image: c.image
    }));
}

async function saveSurvivorConfigs(configs) {
    const mode = dbdCore.MODE;

    await fetch(API_SURVIVORS, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ mode, configs })
    });
}

export const dbdStorageSurvivors = {
    getSurvivorConfigs,
    saveSurvivorConfigs
};