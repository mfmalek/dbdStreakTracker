import { uiHelpers } from "../utils/ui.helpers.js";
import { killerData } from "../data/killer.data.js";

const KILLER_PERK_COUNT = 4;
const KILLER_ADDON_COUNT = 2;

function initKillerSharedUI() {
    setupKillerPerks();
    setupKillerNames();
    setupKillerDynamicBehavior();
}

function initKillerOnlyUI() {
    setupKillerAddons();
}

function setupKillerPerks() {
    const perks = uiHelpers.createOptionsFromArray(killerData.perks);

    for (let p = 1; p <= KILLER_PERK_COUNT; p++) {
        uiHelpers.createTomSelect(`killerPerk${p}`, perks, "Select a perk");
    }
}

function setupKillerAddons() {
    for (let a = 1; a <= KILLER_ADDON_COUNT; a++) {
        uiHelpers.createTomSelect(`killerAddon${a}`, [], "Select an add-on");
    }
}

function updateKillerAddons(killerName) {
    const addons = killerData.addons[killerName] || [];
    const options = uiHelpers.createOptionsFromArray(addons);

    for (let a = 1; a <= KILLER_ADDON_COUNT; a++) {
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
            ? `../images/portraits/killers/Portrait_${clean}.png`
            : "../images/miscellaneous/Icon_Killer.png";

        updateKillerAddons(selected);
    });
}

export const killerCore = {
    KILLER_PERK_COUNT,
    KILLER_ADDON_COUNT,
    initKillerSharedUI,
    initKillerOnlyUI,
    updateKillerAddons
};