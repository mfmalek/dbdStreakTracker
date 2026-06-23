import { groupsApi } from "../../../api/groups.js";

import { survivorCore } from "../../../core/streak/survivor.core.js";
import { survivorController } from "../controller/survivor.controller.js";

import { survivorListeners } from "../events/survivor.listeners.js";
import { survivorPresets } from "../presets/survivor.presets.js";

import { survivorUI } from "../ui/survivor.ui.js";

async function initStreak({ group, matches, actions }) {
    survivorUI.initUI();

    await survivorController.handleRenderTitle();
    await survivorController.handleRenderInvites();
    await survivorController.handleRenderGroupMembers(group);
    await survivorController.handleRenderSurvivors();
    await survivorController.handleRenderTableHeader();

    const names = await survivorController.getSurvivorNames();

    survivorUI.renderTable(names, matches);
    await survivorController.handleRenderStats();

    survivorCore.initSurvivorCore();
    survivorPresets.initPresets();

    survivorListeners.initListeners({
        ui: survivorUI,
        ...actions,
        inviteUser: groupsApi.inviteUser,
        acceptInvite: groupsApi.acceptInvite,
        removeMember: groupsApi.removeMember,
        leaveGroup: groupsApi.leaveGroup,
        renderTitle: survivorController.handleRenderTitle,
        renderTableHeader: survivorController.handleRenderTableHeader
    });
}

export const initSurvivorStreak = {
    initStreak
};