import { http } from "./http.client.js";
import { sharedCore } from "../Core/Streak/shared.core.js";
import { streakContext } from "../Core/Utils/streak.context.js";

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

async function savePreset(survivor, name, perks, addons = []) {
    const { mode, role, killerName } = getContext();
    await http.post("/presets", {
        mode,
        role,
        killerName,
        survivor,
        name,
        perks,
        addons
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