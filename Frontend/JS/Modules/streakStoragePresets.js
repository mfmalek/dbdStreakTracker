import { dbdCore } from "../Core/Survivor Streak/streakCore.js";
import { auth } from "../Auth/auth.js";

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
            headers: getAuthHeaders()
        }
    );

    if (!res.ok) {
        const err = await res.text();
        console.error("GET PRESETS ERROR:", err);
        throw new Error(err);
    }
    return await res.json();
}

async function savePreset(survivor, name, perks) {
    const mode = dbdCore.MODE;

    const res = await fetch(API_PRESETS, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            mode,
            survivor,
            name,
            perks
        })
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("SAVE PRESET ERROR:", err);
        throw new Error(err);
    }
}

async function deletePreset(id) {
    const res = await fetch(`${API_PRESETS}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("DELETE PRESET ERROR:", err);
        throw new Error(err);
    }
}

export const dbdStoragePresets = {
    getPresets,
    savePreset,
    deletePreset
};