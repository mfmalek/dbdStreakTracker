import { survivorData } from "../Data/survivor.data.js";
import { uiHelpers } from "../Utils/ui.helpers.js";
import { sharedCore } from "./shared.core.js";

const SURVIVOR_COUNT = {
    solo: 1,
    duo: 2,
    trio: 3,
    squad: 4
}[sharedCore.MODE];

const SURVIVOR_PERK_COUNT = 4;

function initSurvivorCore() {
    setupSurvivorPerks();
}

function setupSurvivorPerks() {
    const perks = uiHelpers.createOptionsFromArray(survivorData.perks);

    for (let s = 1; s <= SURVIVOR_COUNT; s++) {
        for (let p = 1; p <= SURVIVOR_PERK_COUNT; p++) {
            uiHelpers.createTomSelect(`perk${p}Surv${s}`, perks, "Select a perk");
        }
    }
}

export const survivorCore = {
    SURVIVOR_COUNT,
    SURVIVOR_PERK_COUNT,
    initSurvivorCore
};