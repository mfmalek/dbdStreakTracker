import { survivorData } from "../Data/survivorData.js";
import { uiHelpers } from "../Utils/uiHelpers.js";
import { sharedCore } from "./sharedCore.js";

const SURVIVOR_COUNT = {
    solo: 1,
    duo: 2,
    trio: 3,
    squad: 4
}[sharedCore.MODE];

function initSurvivorCore() {
    setupSurvivorPerks();
}

function setupSurvivorPerks() {
    const perks = uiHelpers.createOptionsFromArray(survivorData.perks);

    for (let s = 1; s <= SURVIVOR_COUNT; s++) {
        for (let p = 1; p <= 4; p++) {
            uiHelpers.createTomSelect(`perk${p}Surv${s}`, perks, "Select a perk");
        }
    }
}

export const survivorCore = {
    SURVIVOR_COUNT,
    initSurvivorCore
};