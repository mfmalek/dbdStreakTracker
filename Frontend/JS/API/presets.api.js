import { http } from "./http.js";
import { streakCore } from "../Core/Survivor Streak/streakCore.js";

function getMode() {
    return streakCore.MODE;
}

async function getPresets(survivor) {
    return http.get("/presets", {
        mode: getMode(),
        survivor
    });
}

async function savePreset(survivor, name, perks) {
    await http.post("/presets", {
        mode: getMode(),
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