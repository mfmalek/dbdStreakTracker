import { uiElements } from "../Utils/ui.elements.js";
import { formElements } from "../../MatchForm/Utils/form.elements.js";
import { killerTableUI } from "./killer.table.ui.js";
import { killerPreviewUI } from "./killer.preview.ui.js";
import { killerRulesUI } from "./killer.rules.ui.js";

function initUI() {
    renderTitle();
    killerRulesUI.renderRules();
}

function renderTitle() {
    const title = uiElements.getStreakTitle();
    if (!title) return;

    title.textContent = "Killer Streak Tracker";
}

function applyKillerToUI(killerName) {
    const image = formElements.getKillerImage();
    const nameEl = document.querySelector(".killer-card .nickname");
    const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

    if (image) {
        image.src = `../Images/Portraits/Killers/Portrait_${clean}.png`;
    }

    if (nameEl) {
        nameEl.textContent = killerName.toUpperCase();
    }
}


export const killerUI = {
    initUI,
    applyKillerToUI,
    renderTable: killerTableUI.renderTable,
    createMatchPreview: killerPreviewUI.createMatchPreview
};