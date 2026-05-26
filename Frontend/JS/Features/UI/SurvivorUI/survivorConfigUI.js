import { uiElements } from "../Utils/uiElements.js";
import { survivorCore } from "../../../Core/Streak/survivorCore.js";
import { survivorData } from "../../../Core/Data/survivorData.js";

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
    const name = config.name || `Surv${index}`;
    const image = config.image || "Portrait_MegThomas.png";

    return `
        <div class="column">
            <div class="nickAndChar">
                <h2 class="nickname editable" id="nicknameSurv${index}" data-index="${index}"> ${name} </h2>
                <img class="characterPortrait selectable" id="imageSurv${index}"
                    data-index="${index}" src="../Images/Portraits/Survivors/${image}" alt="Survivor">
            </div>
        
            <div class="survivorCardWrapper">
                <div class="card">
                    <div class="perkBuilder">
                        <h2 class="perkBuilderTitle">Surv${index}'s build</h2>

                        <div class="perkSlots">${createPerkSlots(index)}</div>
                        ${createPresetControls(index)}
                    </div>
                </div>
                ${createPortraitGrid(index)}
            </div>

            <label>
                <input type="checkbox" id="surv${index}Survived">
                Surv${index} Survived
            </label>
        </div>
    `;
}

function createPerkSlots(index) {
    return [1, 2, 3, 4].map(p => `
        <div class="perkSlot">
            <label class="perkNumberText">Perk ${p}:</label>
            <select id="perk${p}Surv${index}"></select>
        </div>
    `).join("");
}

function createPresetControls(index) {
    return `
        <div class="presetControls">
            <input type="text" placeholder="Preset Name" id="presetNameSurv${index}">
            <button class="presetButton" id="savePresetSurv${index}">Save Preset</button>

            <select id="presetListSurv${index}">
                <option value="">Load Preset</option>
            </select>

            <button class="presetButton" id="deletePresetSurv${index}">Delete</button>
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
            src="../Images/Portraits/Survivors/Portrait_${name}.png"
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