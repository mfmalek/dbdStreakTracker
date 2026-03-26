import { auth } from "./auth.js";
import { dbdCore } from "./streakCore.js";

function initPresets() {
    for(let s = 1; s <= dbdCore.SURVIVOR_COUNT; s++) {
        document.getElementById(`savePresetSurv${s}`)?.addEventListener("click", () => savePreset(s));
        document.getElementById(`presetListSurv${s}`)?.addEventListener("change", () => loadPreset(s));
        document.getElementById(`deletePresetSurv${s}`)?.addEventListener("click", () => deletePreset(s));

        setupPresetList(s);
    }
}

function savePreset(survivorIndex) {
    const presetInput = document.getElementById(`presetNameSurv${survivorIndex}`);
    const presetName = presetInput?.value.trim();

    if(!presetName) return alert("Enter a preset name.");

    const key = `presets_${auth.getCurrentUser()}_${dbdCore.MODE}_Surv${survivorIndex}`;
    const savedPresets = JSON.parse(localStorage.getItem(key)) || [];

    const perks = [];
    for(let i = 1; i <= 4; i++) {
        const select = document.getElementById(`perk${i}Surv${survivorIndex}`);
        perks.push(select?.value || "");
    }

    savedPresets.push({ name: presetName, perks });
    localStorage.setItem(key, JSON.stringify(savedPresets));

    presetInput.value = "";
    alert(`Preset "${presetName}" saved!`);
    setupPresetList(survivorIndex);
}

function loadPreset(survivorIndex) {
    const dropdown = document.getElementById(`presetListSurv${survivorIndex}`);
    const selectedIndex = dropdown.selectedIndex;
    if(selectedIndex <= 0) return;

    const key = `presets_${auth.getCurrentUser()}_${dbdCore.MODE}_Surv${survivorIndex}`;
    const savedPresets = JSON.parse(localStorage.getItem(key)) || [];
    const preset = savedPresets[selectedIndex - 1];
    if(!preset) return;

    preset.perks.forEach((perk, i) => {
        const select = document.getElementById(`perk${i + 1}Surv${survivorIndex}`);
        
        if(select?.tomselect) {
            select.tomselect.setValue(perk);
        } else {
            select.value = perk;
        }
    });
}

function deletePreset(survivorIndex) {
    const dropdown = document.getElementById(`presetListSurv${survivorIndex}`);
    const selectedIndex = dropdown.selectedIndex;
    if(selectedIndex <= 0) return alert("Select a preset to delete.");

    const key = `presets_${auth.getCurrentUser()}_${dbdCore.MODE}_Surv${survivorIndex}`;
    const savedPresets = JSON.parse(localStorage.getItem(key)) || [];
    const deleted = savedPresets.splice(selectedIndex - 1, 1);

    localStorage.setItem(key, JSON.stringify(savedPresets));
    alert(`Preset "${deleted[0].name}" deleted.`);
    setupPresetList(survivorIndex);
}

function setupPresetList(survivorIndex) {
    const key = `presets_${auth.getCurrentUser()}_${dbdCore.MODE}_Surv${survivorIndex}`;
    const savedPresets = JSON.parse(localStorage.getItem(key)) || [];
    const dropdown = document.getElementById(`presetListSurv${survivorIndex}`);

    dropdown.innerHTML = `<option value="">Load Preset</option>`;

    savedPresets.forEach((preset, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = preset.name;
        dropdown.appendChild(option);
    });

    if(dropdown.tomselect) {
        dropdown.tomselect.clear();
        dropdown.tomselect.refreshOptions(false);
    }
}

export const dbdPresets = {
    initPresets
}