import { killerUI } from "../../Features/Killer Streak/killerUI.js";
import { killerController } from "../../Features/Killer Streak/killerController.js";
import { killerCore } from "../../Core/Streak/killerCore.js";
import { killerListeners } from "../../Features/Killer Streak/killerListeners.js";

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