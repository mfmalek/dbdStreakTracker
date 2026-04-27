import { http } from "./http.js";
import { sharedCore } from "../Core/Streak/sharedCore.js";
import { streakContext } from "../Core/Utils/streakContext.js";

function getContext() {
    const { role, killerName } = streakContext.getContext();

    return {
        mode: sharedCore.MODE,
        role,
        killerName
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