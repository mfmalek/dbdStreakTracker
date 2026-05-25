import { survivorCore } from "../../Core/Streak/survivorCore.js";
import { formHelpers } from "./Utils/formHelpers.js";

function getSurvivors() {
    const survivors = [];

    for (let s = 1; s <= survivorCore.SURVIVOR_COUNT; s++) {
        const perks = [];

        for (let p = 1; p <= 4; p++) {
            const select = document.getElementById(`perk${p}Surv${s}`);

            perks.push(select?.value || "");
        }

        survivors.push({
            name: `Surv${s}`,
            perks,
            survived: document.getElementById(`surv${s}Survived`)?.checked || false
        });
    }

    return survivors;
}

function populateSurvivorMatch(match) {
    populateSurvivor(match);
    populateKiller(match);
    populateMap(match);
}

function populateSurvivor(match) {
    match.survivors?.forEach((surv, sIndex) => {
        surv.perks?.forEach((perk, pIndex) => {
            const select = document.getElementById(`perk${pIndex + 1}Surv${sIndex + 1}`);

            if (!select) return;

            formHelpers.setSelectValue(select, perk);
        });

        const checkbox = document.getElementById(`surv${sIndex + 1}Survived`);

        if (checkbox) {
            checkbox.checked = surv.survived;
        }
    });
}

function populateKiller(match) {
    const killerSelect = document.getElementById("killerName");

    formHelpers.setSelectValue(killerSelect, match.killerName);

    for (let p = 1; p <= 4; p++) {
        const select = document.getElementById(`killerPerk${p}`);
        const perk = match.killerPerks?.[p - 1] || "";

        formHelpers.setSelectValue(select, perk);
    }
}

function populateMap(match) {
    const mapSelect = document.getElementById("mapName");
    formHelpers.setSelectValue(mapSelect, match.mapName);
}

export const survivorMatchForm = {
    getSurvivors,
    populateSurvivorMatch
};