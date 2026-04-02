import { dbdCore } from "./streakCore.js";
import { auth } from "./auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";
const API_PRESETS = `${API_URL}/presets`;

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.getToken()}`
    };
}

async function getPresets(survivor) {
    const mode = dbdCore.MODE;

    const res = await fetch(
        `${API_PRESETS}?mode=${mode}&survivor=${survivor}`,
        {
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        }
    );
    if (!res.ok) {
        console.error("Failed to fetch presets");
        return [];
    }
    return await res.json();
}

async function savePreset(survivor, name, perks) {
    const mode = dbdCore.MODE;

    await fetch(API_PRESETS, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            mode,
            survivor,
            name,
            perks
        })
    });
}

async function deletePreset(id) {
    await fetch(`${API_PRESETS}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    });
}

export const dbdStoragePresets = {
    getPresets,
    savePreset,
    deletePreset
};