import { selectHelpers } from "../helpers/select.helpers.js";
import { matchFormElements } from "../dom/match.form.elements.js";
import { killerCore } from "../../../core/streak/killer.core.js";

function populateKillerMatch(match) {
    const mapSelect = matchFormElements.getMapSelect();
    const killsInput = matchFormElements.getKillsInput();

    selectHelpers.setSelectValue(mapSelect, match.mapName);
    killsInput.value = match.kills ?? "";

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const perksSelect = matchFormElements.getKillerPerkSelect(p);
        const perk = match.killerPerks?.[p - 1] || "";
        
        selectHelpers.setSelectValue(perksSelect, perk);
    }

    for (let a = 1; a <= killerCore.KILLER_ADDON_COUNT; a++) {
        const addonSelect = matchFormElements.getKillerAddonSelect(a);
        const addon = match.killerAddons?.[a - 1] || "";

        selectHelpers.setSelectValue(addonSelect, addon);
    }
}

export const killerMatchForm = {
    populateKillerMatch
};