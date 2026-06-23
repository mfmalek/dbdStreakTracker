import { killerCore } from "../../core/streak/killer.core.js";
import { killerController } from "../killer-streak/killer.controller.js";

import { killerListeners } from "../killer-streak/killer.listeners.js";
import { killerPresets } from "../killer-streak/killer.presets.js";

import { killerUI } from "../ui/killer/killer.ui.js";

async function initStreak({ group, matches, killerName, actions }) {
    await killerUI.initUI(group);

    killerUI.renderTable(matches);

    await killerController.handleRenderStats();

    killerCore.initKillerOnlyUI();
    killerPresets.initPresets();

    killerListeners.initListeners(actions);

    setTimeout(() => {
        const killerSelect = document.getElementById('killerSelect');
        const dropdownValue = killerSelect?.tomselect ? killerSelect.tomselect.getValue() : killerSelect?.value;
        const currentKiller = killerName || dropdownValue || "";

        killerUI.applyKillerToUI(currentKiller); 

        if (currentKiller) {
            killerCore.updateKillerAddons(currentKiller);
        }
    }, 100);
}

export const initKillerStreak = {
    initStreak
};