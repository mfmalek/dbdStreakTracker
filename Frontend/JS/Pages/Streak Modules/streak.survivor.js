import { survivorUI } from "../../Features/Survivor Streak/survivorUI.js";
import { survivorController } from "../../Features/Survivor Streak/survivorController.js";
import { survivorCore } from "../../Core/Streak/survivorCore.js";
import { survivorListeners } from "../../Features/Survivor Streak/survivorListeners.js";
import { survivorPresets } from "../../Features/Survivor Streak/survivorPresets.js";
import { groupsApi } from "../../API/groups.api.js";

export async function initSurvivorStreak({ group, matches, actions }) {
    survivorUI.initUI();

    await survivorController.handleRenderTitle();
    await survivorController.handleRenderInvites();
    await survivorController.handleRenderGroupMembers(group);
    await survivorController.handleRenderSurvivors();
    await survivorController.handleRenderTableHeader();

    survivorUI.renderTable(matches || []);
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