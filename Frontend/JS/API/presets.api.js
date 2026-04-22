import { http } from "./http.js";
import { dbdCore } from "../Core/Survivor Streak/streakCore.js";

function getMode() {
    return dbdCore.MODE;
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

export const dbdStoragePresets = {
    getPresets,
    savePreset,
    deletePreset
};