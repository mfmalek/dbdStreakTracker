import { survivorCore } from "../../Core/Streak/survivor.core.js";
import { survivorController } from "../../Features/Survivor Streak/survivor.controller.js";

async function saveConfigs() {
    const configs = [];

    for (let i = 1; i <= survivorCore.SURVIVOR_COUNT; i++) {
        configs.push({
            name:
                document.getElementById(`nicknameSurv${i}`)
                    ?.textContent || `Surv${i}`,

            image:
                document.getElementById(`imageSurv${i}`)
                    ?.src
                    .split("/")
                    .pop()
        });
    }

    await survivorController.handleSaveConfigs(configs);
}

export const streakConfigs = {
    saveConfigs
};