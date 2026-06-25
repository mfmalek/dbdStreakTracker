import { uiElements } from "../../shared-streak/index.js";
import { survivorCore } from "../../../core/streak/survivor.core.js";
import { survivorData } from "../../../core/data/survivor.data.js";

function renderSurvivors(configs) {
    const container = uiElements.getSurvivorContainer();

    if (!container) return;

    container.innerHTML = "";

    for (let i = 1; i <= survivorCore.SURVIVOR_COUNT; i++) {
        const config = configs[i - 1];

        container.insertAdjacentHTML(
            "beforeend",
            createSurvivorColumn(i, config)
        );

        const grid = uiElements.getSurvivorPortraitGrid(i);
        const savedImage = config?.image || "Portrait_MegThomas.png";

        applySelectedPortrait(grid, savedImage);
    }
}

function createSurvivorColumn(index, config = {}) {
    const name = config.name || `Surv ${index}`;
    const image = config.image || "Portrait_MegThomas.png";

    return `
        <div class="character-wrapper">
            <div class="card survivor-card">
                <div class="card-header">
                    <div class="header-info">
                        <div class="role-icon survivor-icon">🛡️</div>
                        <div class="name-role">
                            <h2 class="nickname editable" id="nicknameSurv${index}" data-index="${index}">${name}</h2>
                            <span class="role-text">SURVIVOR ${index}</span>
                        </div>
                    </div>
                    <button class="icon-btn edit-btn">✎</button>
                </div>

                <div class="card-body">
                    <div class="survivorCardWrapper">
                        <div class="portrait-container">
                            <img class="characterPortrait selectable" id="imageSurv${index}" data-index="${index}" src="../images/portraits/survivors/${image}" alt="Survivor">
                        </div>
                        ${createPortraitGrid(index)}
                    </div>

                    <div class="build-section">
                        <h2 class="perkBuilderTitle">Surv ${index}'s Build</h2>
                        <div class="perkSlots-row">${createPerkSlots(index)}</div>
                        ${createPresetControls(index)}
                    </div>
                </div>
            </div>
            
            <label class="survived-checkbox">
                <input type="checkbox" id="surv${index}Survived">
                Surv ${index} Escaped
            </label>
        </div>
    `;
}

function createPerkSlots(index) {
    return [1, 2, 3, 4].map(p => `
        <div class="perkSlot wrapper">
            <div class="perk-input-container">
                <div class="perk-diamond survivor-diamond"></div>
                <span class="plus-icon">+</span>
                <select id="perk${p}Surv${index}" class="hidden-select"></select>
            </div>
            <label class="perkNumberText">PERK ${p}</label>
        </div>
    `).join("");
}

function createPresetControls(index) {
    return `
        <div class="presetControls row">
            <div class="preset-input-group">
                <span class="preset-icon">💾</span>
                <select class="presetSelect" id="presetListSurv${index}">
                    <option value="">Load Preset</option>
                </select>
            </div>
            <button class="presetButton save" id="savePresetSurv${index}">Save Preset</button>
            <button class="presetButton delete icon-only" id="deletePresetSurv${index}">🗑️</button>
        </div>
    `;
}

function createPortraitGrid(index) {
    return `
        <div class="portraitGrid hidden" id="portraitGridSurv${index}">
            ${createPortraitGridOptions()}
        </div>
    `;
}

function createPortraitGridOptions() {
    const survivors = survivorData.names;
    const survivorNames = survivors.map(name =>
        name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "")
    );

    return survivorNames.map(name => `
        <img 
            class="portraitOption"
            data-image="Portrait_${name}.png"
            src="../images/portraits/survivors/Portrait_${name}.png"
        >
    `).join("");
}

function applySelectedPortrait(grid, savedImage) {
    if (!grid || !savedImage) return;

    grid.querySelectorAll(".portraitOption").forEach(opt => {
        opt.classList.toggle("selected", opt.dataset.image === savedImage);
    });
}

export const survivorConfigUI = {
    renderSurvivors
};