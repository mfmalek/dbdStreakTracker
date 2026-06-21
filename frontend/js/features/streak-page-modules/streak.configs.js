import { survivorCore } from "../../core/streak/survivor.core.js";
import { survivorController } from "../survivor-streak/survivor.controller.js";

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