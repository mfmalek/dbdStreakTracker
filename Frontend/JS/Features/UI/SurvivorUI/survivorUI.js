import { uiElements } from "../Utils/uiElements.js";
import { survivorRulesUI } from "../SurvivorUI/survivorRulesUI.js";
import { survivorTableUI } from "../SurvivorUI/survivorTableUI.js";
import { survivorConfigUI } from "../SurvivorUI/survivorConfigUI.js";
import { survivorGroupUI } from "../SurvivorUI/survivorGroupUI.js";
import { survivorPreviewUI } from "../SurvivorUI/survivorPreviewUI.js";

async function initUI() {
    survivorRulesUI.renderRules();
}

function renderTitle(names) {
    const title = uiElements.getStreakTitle();

    if (!title) return;

    const formatted = formatNamesForTitle(names);
    title.textContent = `${formatted} - Escape Streak Tracker`;
}

function formatNamesForTitle(names) {
    if (names.length === 1) return names[0];
    if (names.length === 2) return names.join(" & ");

    return `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;
}

export const survivorUI = {
    initUI,
    renderTitle,
    renderTable: survivorTableUI.renderTable,
    renderTableHeader: survivorTableUI.renderTableHeader,
    renderSurvivors: survivorConfigUI.renderSurvivors,
    renderGroupMembers: survivorGroupUI.renderGroupMembers,
    renderInvites: survivorGroupUI.renderInvites,
    createMatchPreview: survivorPreviewUI.createMatchPreview
}