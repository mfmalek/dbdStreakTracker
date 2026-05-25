import { formHelpers } from "./Utils/formHelpers.js";

function populateKillerMatch(match) {
    const mapSelect = document.getElementById("mapName");

    formHelpers.setSelectValue(mapSelect, match.mapName);

    document.getElementById("kills").value = match.kills ?? "";

    for (let p = 1; p <= 4; p++) {
        const perksSelect = document.getElementById(`killerPerk${p}`);
        const perk = match.killerPerks?.[p - 1] || "";
        
        formHelpers.setSelectValue(perksSelect, perk);
    }

    for (let a = 1; a <= 2; a++) {
        const addonSelect = document.getElementById(`killerAddon${a}`);
        const addon = match.killerAddons?.[a - 1] || "";

        formHelpers.setSelectValue(addonSelect, addon);
    }
}

export const killerMatchForm = {
    populateKillerMatch
};