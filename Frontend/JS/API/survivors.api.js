import { http } from "./http.js";
import { dbdCore } from "../core/streak/streakCore.js";

function getMode() {
    return dbdCore.MODE;
}

async function getSurvivorConfigs() {
    const data = await http.get("/survivors", {
        mode: getMode()
    });

    return data.map(c => ({
        name: c.name,
        image: c.image
    }));
}

async function saveSurvivorConfigs(configs) {
    await http.post("/survivors", {
        mode: getMode(),
        configs
    });
}

export const dbdStorageSurvivors = {
    getSurvivorConfigs,
    saveSurvivorConfigs
};