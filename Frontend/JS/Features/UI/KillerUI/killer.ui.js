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

    if (!killerName) {
        if (image) image.style.display = 'none';
        if (nameEl) nameEl.textContent = 'SELECT KILLER';
        return;
    }

    const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

    if (image) {
        image.onload = null;
        image.onerror = null;

        image.style.display = 'none';
        image.src = `/Images/Portraits/Killers/Portrait_${clean}.png`;

        image.onload = () => {
            image.style.display = 'block';
        };

        image.onerror = () => {
            image.style.display = 'none'; 
        };
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