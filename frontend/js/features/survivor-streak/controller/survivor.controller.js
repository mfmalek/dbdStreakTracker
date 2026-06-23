import { auth } from "../../../auth/auth.js";

import { survivorsApi } from "../../../api/survivors.js";
import { groupsApi } from "../../../api/groups.js";
import { matchesApi } from "../../../api/matches.js";

import { survivorCore } from "../../../core/streak/survivor.core.js";
import { createBaseController } from "../../core-streak/base.controller.js";

import { sharedStatsUI } from "../../ui/shared/shared.stats.ui.js";
import { survivorUI } from "../ui/survivor.ui.js";

const base = createBaseController({
    renderTable: survivorUI.renderTable,
    renderStats: sharedStatsUI.renderStats,

    refreshTable: async() => {
        const names = await getSurvivorNames();
        const matches = await matchesApi.getMatches();

        survivorUI.renderTable(names, matches);
    }
});

async function handleSaveConfigs(configs) {
    await survivorsApi.saveSurvivorConfigs(configs);

    const names = await getSurvivorNames();

    survivorUI.renderTitle(names);
    survivorUI.renderTableHeader(names);
}

async function getSurvivorNames() {
    const configs = await survivorsApi.getSurvivorConfigs();

    return Array.from({ length: survivorCore.SURVIVOR_COUNT }, (_, i) =>
        configs[i]?.name || `Surv${i + 1}`
    );
}

async function handleRenderTitle() {
    const names = await getSurvivorNames();
    survivorUI.renderTitle(names);
}

async function handleRenderSurvivors() {
    const configs = await survivorsApi.getSurvivorConfigs();
    survivorUI.renderSurvivors(configs);
}

async function handleEditMatch(matchId, updatedMatch) {
    await matchesApi.updateMatch(matchId, updatedMatch);

    const names = await getSurvivorNames();
    const matches = await matchesApi.getMatches();

    await survivorUI.renderTable(names, matches);
}

async function handleRenderInvites() {
    const invites = await groupsApi.getInvites();
    survivorUI.renderInvites(invites);
}

async function handleRenderGroupMembers(group) {
    if (!group?.id) {
        survivorUI.renderGroupMembers([], group, null);
        return;
    }

    const members = await groupsApi.getGroupMembers(group.id);
    const currentUser = auth.getUserFromToken()?.username;

    survivorUI.renderGroupMembers(members, group, currentUser);
}

async function handleRenderTableHeader() {
    const names = await getSurvivorNames();
    survivorUI.renderTableHeader(names);
}

async function handleCreateMatchPreview(match) {
    const names = await getSurvivorNames();
    return survivorUI.createMatchPreview(match, names);
}

export const survivorController = {
    ...base,
    handleSaveConfigs,
    getSurvivorNames,
    handleRenderTitle,
    handleRenderSurvivors,
    handleEditMatch,
    handleRenderInvites,
    handleRenderGroupMembers,
    handleRenderTableHeader,
    handleCreateMatchPreview
};