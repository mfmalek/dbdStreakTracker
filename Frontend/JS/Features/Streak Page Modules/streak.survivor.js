import { survivorUI } from "../UI/SurvivorUI/survivor.ui.js";
import { survivorController } from "../Survivor Streak/survivor.controller.js";
import { survivorCore } from "../../Core/Streak/survivor.core.js";
import { survivorListeners } from "../Survivor Streak/survivor.listeners.js";
import { survivorPresets } from "../Survivor Streak/survivor.presets.js";
import { groupsApi } from "../../API/groups.api.js";

export async function initSurvivorStreak({ group, matches, actions }) {
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