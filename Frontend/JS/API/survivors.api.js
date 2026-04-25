import { http } from "./http.js";
import { streakCore } from "../Core/Streak/streakCore.js";

function getMode() {
    return streakCore.MODE;
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

export const survivorsApi = {
    getSurvivorConfigs,
    saveSurvivorConfigs
};