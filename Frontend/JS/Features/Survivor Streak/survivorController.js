import { createBaseController } from "../Core Streak/baseController.js";
import { sharedUI } from "../Core Streak/sharedUI.js";
import { survivorUI } from "./survivorUI.js";
import { survivorsApi } from "../../API/survivors.api.js";

const base = createBaseController({
    renderTable: survivorUI.renderTable,
    renderStats: sharedUI.renderStats
});

async function handleSaveConfigs(configs) {
    await survivorsApi.saveSurvivorConfigs(configs);
    await survivorUI.renderTitle();
    await survivorUI.renderTableHeader();
}

async function handleRenderInvites() {
    const invites = await groupsApi.getInvites();
    survivorUI.renderInvites(invites);
}

export const survivorController = {
    ...base,
    handleSaveConfigs
};