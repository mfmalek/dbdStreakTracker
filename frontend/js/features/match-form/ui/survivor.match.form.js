import { survivorCore } from "../../../core/streak/survivor.core.js";
import { killerCore } from "../../../core/streak/killer.core.js";

import { selectHelpers } from "../helpers/select.helpers.js";
import { matchFormElements } from "../dom/match.form.elements.js";

function getSurvivors() {
    const survivors = [];

    for (let s = 1; s <= survivorCore.SURVIVOR_COUNT; s++) {
        const survivorCheckbox = matchFormElements.getSurvivorCheckbox(s);
        const perks = [];

        for (let p = 1; p <= survivorCore.SURVIVOR_PERK_COUNT; p++) {
            const select = matchFormElements.getSurvivorPerkSelect(s, p);

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
            const select = matchFormElements.getSurvivorPerkSelect(sIndex + 1, pIndex + 1);

            if (!select) return;

            selectHelpers.setSelectValue(select, perk);
        });

        const checkbox = matchFormElements.getSurvivorCheckbox(sIndex + 1);

        if (checkbox) {
            checkbox.checked = surv.survived;
        }
    });
}

function populateKiller(match) {
    const killerSelect = matchFormElements.getKillerSelect();

    selectHelpers.setSelectValue(killerSelect, match.killerName);

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const select = matchFormElements.getKillerPerkSelect(p);
        const perk = match.killerPerks?.[p - 1] || "";

        selectHelpers.setSelectValue(select, perk);
    }
}

function populateMap(match) {
    const mapSelect = matchFormElements.getMapSelect();
    selectHelpers.setSelectValue(mapSelect, match.mapName);
}

export const survivorMatchForm = {
    getSurvivors,
    populateSurvivorMatch
};