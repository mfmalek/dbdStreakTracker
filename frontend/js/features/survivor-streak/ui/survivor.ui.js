import { uiElements } from "../../shared-streak/index.js";
import { survivorRulesUI } from "./survivor.rules.ui.js";
import { survivorTableUI } from "./survivor.table.ui.js";
import { survivorConfigUI } from "./survivor.config.ui.js";
import { survivorGroupUI } from "./survivor.group.ui.js";
import { survivorMatchPreview } from "../services/match.preview.service.js";

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
    createMatchPreview: survivorMatchPreview.createMatchPreview
}