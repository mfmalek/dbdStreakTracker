import { http } from "./http.js";
import { streakCore } from "../Core/Streak/streakCore.js";

function getContext() {
    return {
        mode: streakCore.MODE,
        role: "survivor",
        killerName: "__survivor__"
    };
}

async function getPresets(survivor) {
    const { mode, role, killerName } = getContext();
    return http.get("/presets", {
        mode,
        role,
        killerName,
        survivor
    });
}

async function savePreset(survivor, name, perks) {
    const { mode, role, killerName } = getContext();
    await http.post("/presets", {
        mode,
        role,
        killerName,
        survivor,
        name,
        perks
    });
}

async function deletePreset(id) {
    await http.del(`/presets/${id}`);
}

export const presetsApi = {
    getPresets,
    savePreset,
    deletePreset
};