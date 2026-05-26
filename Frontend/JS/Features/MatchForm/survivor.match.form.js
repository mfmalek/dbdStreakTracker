import { survivorCore } from "../../Core/Streak/survivor.core.js";
import { killerCore } from "../../Core/Streak/killer.core.js";
import { selectHelpers } from "./Utils/select.helpers.js";
import { formElements } from "./Utils/form.elements.js";

function getSurvivors() {
    const survivors = [];

    for (let s = 1; s <= survivorCore.SURVIVOR_COUNT; s++) {
        const survivorCheckbox = formElements.getSurvivorCheckbox(s);
        const perks = [];

        for (let p = 1; p <= survivorCore.SURVIVOR_PERK_COUNT; p++) {
            const select = formElements.getSurvivorPerkSelect(s, p);

            perks.push(select?.value || "");
        }

        survivors.push({
            name: `Surv${s}`,
            perks,
            survived: survivorCheckbox?.checked || false
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
            const select = formElements.getSurvivorPerkSelect(sIndex + 1, pIndex + 1);

            if (!select) return;

            selectHelpers.setSelectValue(select, perk);
        });

        const checkbox = formElements.getSurvivorCheckbox(sIndex + 1);

        if (checkbox) {
            checkbox.checked = surv.survived;
        }
    });
}

function populateKiller(match) {
    const killerSelect = formElements.getKillerSelect();

    selectHelpers.setSelectValue(killerSelect, match.killerName);

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const select = formElements.getKillerPerkSelect(p);
        const perk = match.killerPerks?.[p - 1] || "";

        selectHelpers.setSelectValue(select, perk);
    }
}

function populateMap(match) {
    const mapSelect = formElements.getMapSelect();
    selectHelpers.setSelectValue(mapSelect, match.mapName);
}

export const survivorMatchForm = {
    getSurvivors,
    populateSurvivorMatch
};