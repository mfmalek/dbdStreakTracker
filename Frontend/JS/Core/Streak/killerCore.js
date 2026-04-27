import { killerData } from "../Data/killerData.js";
import { uiHelpers } from "../Utils/uiHelpers.js";

function initKillerCore() {
    setupKillerPerks();
    setupKillerAddons();
    setupKillerNames();
    setupKillerDynamicBehavior();
}

function setupKillerPerks() {
    const perks = uiHelpers.createOptionsFromArray(killerData.perks);

    for (let p = 1; p <= 4; p++) {
        uiHelpers.createTomSelect(`killerPerk${p}`, perks, "Select a perk");
    }
}

function setupKillerAddons() {
    for (let a = 1; a <= 2; a++) {
        uiHelpers.createTomSelect(`killerAddon${a}`, [], "Select an add-on");
    }
}

function updateKillerAddons(killerName) {
    const addons = killerData.addons[killerName] || [];
    const options = uiHelpers.createOptionsFromArray(addons);

    for (let a = 1; a <= 2; a++) {
        const select = document.getElementById(`killerAddon${a}`);

        if (!select || !select.tomselect) continue;

        select.tomselect.clear();
        select.tomselect.clearOptions();
        select.tomselect.addOptions(options);
    }
}

function setupKillerNames() {
    const options = uiHelpers.createOptionsFromArray(killerData.names);
    uiHelpers.createTomSelect("killerName", options, "Select Killer");
}

function setupKillerDynamicBehavior() {
    const select = document.getElementById("killerName");
    const image = document.getElementById("killerImage");

    if (!select || !image) return;

    if (select.value) {
        updateKillerAddons(select.value);
    }

    select.addEventListener("change", () => {
        const selected = select.value;
        const clean = selected.replace(/[^a-zA-Z0-9]/g, "");

        image.src = selected
            ? `../Images/Portraits/Killers/Portrait_${clean}.png`
            : "../Images/Miscellaneous/Icon_Killer.png";

        updateKillerAddons(selected);
    });
}

export const killerCore = {
    initKillerCore
};