import { dbdCore } from "./streakCore.js";
import { dbdStoragePresets } from "./streakStoragePresets.js";

function initPresets() {
    for (let s = 1; s <= dbdCore.SURVIVOR_COUNT; s++) {
        document.getElementById(`savePresetSurv${s}`)?.addEventListener("click", () => savePreset(s));
        document.getElementById(`presetListSurv${s}`)?.addEventListener("change", () => applyPreset(s));
        document.getElementById(`deletePresetSurv${s}`)?.addEventListener("click", () => deletePreset(s));
        loadPresets(s);
    }
}

async function savePreset(survivor) {
    const nameInput = document.getElementById(`presetNameSurv${survivor}`);
    const name = nameInput.value.trim();

    if (!name) {
        alert("Please enter a preset name.");
        return;
    }

    const perks = [];

    for (let i = 1; i <= 4; i++) {
        const select = document.getElementById(`perk${i}Surv${survivor}`);
        perks.push(select?.value || "");
    }
    await dbdStoragePresets.savePreset(survivor, name, perks);
    nameInput.value = "";
    await loadPresets(survivor);

    const select = document.getElementById(`presetListSurv${survivor}`);
    select.value = select.options[select.options.length - 1].value;
}

async function loadPresets(survivor) {
    const presets = await dbdStoragePresets.getPresets(survivor);
    const select = document.getElementById(`presetListSurv${survivor}`);

    if (!select) return;
    select.innerHTML = `<option value="">Load Preset</option>`;
    presets.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        option.dataset.perks = JSON.stringify(p.perks);
        select.appendChild(option);
    });
}

async function deletePreset(survivor) {
    const select = document.getElementById(`presetListSurv${survivor}`);
    const id = select.value;
    const selectedOption = select.options[select.selectedIndex];

    if (!id) {
        alert("Select a preset to delete.");
        return;
    }

    const confirmDelete = confirm(`Delete preset: ${selectedOption.textContent}?`);

    if (!confirmDelete) return;
    await dbdStoragePresets.deletePreset(id);
    await loadPresets(survivor);
}

function applyPreset(survivor) {
    const select = document.getElementById(`presetListSurv${survivor}`);
    const selected = select.options[select.selectedIndex];

    if (!select || !selected || !selected.dataset.perks) return;
    const perks = JSON.parse(selected.dataset.perks);

    perks.forEach((perk, index) => {
        const selectEl = document.getElementById(`perk${index + 1}Surv${survivor}`);

        if (selectEl?.tomselect) {
            selectEl.tomselect.setValue(perk);
        } else {
            selectEl.value = perk;
        }
    });
}

export const dbdPresets = {
    initPresets
}