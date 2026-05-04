import { createBaseController } from "../Core Streak/baseController.js";
import { streakUI } from "./streakUI.js";
import { survivorsApi } from "../../API/survivors.api.js";

const base = createBaseController({
    renderTable: streakUI.renderTable,
    renderStats: streakUI.renderStats
});

async function handleSaveConfigs(configs) {
    await survivorsApi.saveSurvivorConfigs(configs);
    await streakUI.renderTitle();
    await streakUI.renderTableHeader();
}

export const survivorController = {
    ...base,
    handleSaveConfigs
};