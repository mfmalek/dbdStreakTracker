import { uiElements } from "../Utils/uiElements.js";
import { formElements } from "../../MatchForm/Utils/formElements.js";
import { killerTableUI } from "./killerTableUI.js";
import { killerPreviewUI } from "./killerPreviewUI.js";
import { killerRulesUI } from "./killerRulesUI.js";

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
    const nameEl = document.querySelector("#killerInfo .nickname");
    const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

    if (image) {
        image.src = `../Images/Portraits/Killers/Portrait_${clean}.png`;
    }

    if (nameEl) {
        nameEl.textContent = killerName;
    }
}


export const killerUI = {
    initUI,
    applyKillerToUI,
    renderTable: killerTableUI.renderTable,
    createMatchPreview: killerPreviewUI.createMatchPreview
};