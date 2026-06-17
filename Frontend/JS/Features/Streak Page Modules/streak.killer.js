import { killerUI } from "../UI/KillerUI/killer.ui.js";
import { killerController } from "../Killer Streak/killer.controller.js";
import { killerCore } from "../../Core/Streak/killer.core.js";
import { killerListeners } from "../Killer Streak/killer.listeners.js";
import { killerPresets } from "../Killer Streak/killer.presets.js";

export async function initKillerStreak({ group, matches, killerName, actions }) {
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