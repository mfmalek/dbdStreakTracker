import { killerUI } from "../../Features/UI/KillerUI/killer.ui.js";
import { killerController } from "../../Features/Killer Streak/killer.controller.js";
import { killerCore } from "../../Core/Streak/killer.core.js";
import { killerListeners } from "../../Features/Killer Streak/killer.listeners.js";

export async function initKillerStreak({ group, matches, killerName, actions }) {
    await killerUI.initUI(group);

    killerUI.renderTable(matches || []);

    await killerController.handleRenderStats();

    killerCore.initKillerOnlyUI();

    if (killerName) {
        killerUI.applyKillerToUI(killerName);
        killerCore.updateKillerAddons(killerName);
    }

    killerListeners.initListeners(actions);
}