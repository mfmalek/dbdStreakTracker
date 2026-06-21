import { selectHelpers } from "./utils/select.helpers.js";
import { formElements } from "./utils/form.elements.js";
import { killerCore } from "../../core/streak/killer.core.js";

function populateKillerMatch(match) {
    const mapSelect = formElements.getMapSelect();
    const killsInput = formElements.getKillsInput();

    selectHelpers.setSelectValue(mapSelect, match.mapName);
    killsInput.value = match.kills ?? "";

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const perksSelect = formElements.getKillerPerkSelect(p);
        const perk = match.killerPerks?.[p - 1] || "";
        
        selectHelpers.setSelectValue(perksSelect, perk);
    }

    for (let a = 1; a <= killerCore.KILLER_ADDON_COUNT; a++) {
        const addonSelect = formElements.getKillerAddonSelect(a);
        const addon = match.killerAddons?.[a - 1] || "";

        selectHelpers.setSelectValue(addonSelect, addon);
    }
}

export const killerMatchForm = {
    populateKillerMatch
};