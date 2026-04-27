import { http } from "./http.js";
import { sharedCore } from "../Core/Streak/sharedCore.js";

function getMode() {
    return sharedCore.MODE;
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