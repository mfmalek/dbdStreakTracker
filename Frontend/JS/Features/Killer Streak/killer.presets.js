import { presetsApi } from "../../API/presets.api.js";

function initPresets() {
    document.getElementById("savePresetKiller")?.addEventListener("click", savePreset);
    document.getElementById("presetListKiller")?.addEventListener("change", applyPreset);
    document.getElementById("deletePresetKiller")?.addEventListener("click", deletePreset);
    loadPresets();
}

async function savePreset() {
    const nameInput = document.getElementById("presetNameKiller");
    const name = nameInput.value.trim();

    if (!name) {
        alert("Please enter a preset name.");
        return;
    }

    const perks = [];
    const addons = [];

    for (let i = 1; i <= 4; i++) {
        const select = document.getElementById(`killerPerk${i}`);
        perks.push(select?.value || "");
    }

    for (let i = 1; i <= 2; i++) {
        const select = document.getElementById(`killerAddon${i}`);
        addons.push(select?.value || "");
    }
    await presetsApi.savePreset(undefined, name, perks, addons);
    nameInput.value = "";
    await loadPresets();

    const select = document.getElementById("presetListKiller");
    select.value = select.options[select.options.length - 1].value;
}

async function loadPresets() {
    const presets = await presetsApi.getPresets();
    const select = document.getElementById("presetListKiller");

    if (!select) return;

    select.innerHTML = `<option value="">Load Preset</option>`;
    presets.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        option.dataset.perks = JSON.stringify(p.perks || []);
        option.dataset.addons = JSON.stringify(p.addons || []);
        select.appendChild(option);
    });
}

async function deletePreset() {
    const select = document.getElementById("presetListKiller");
    const id = select.value;
    const selected = select.options[select.selectedIndex];

    if (!id) {
        alert("Select a preset to delete.");
        return;
    }

    const confirmDelete = confirm(`Delete preset: ${selected.textContent}?`);

    if (!confirmDelete) return;
    await presetsApi.deletePreset(id);
    await loadPresets();
}

function applyPreset() {
    const select = document.getElementById("presetListKiller");
    const selected = select.options[select.selectedIndex];

    if (!selected) return;
    const perks = JSON.parse(selected.dataset.perks);
    const addons = JSON.parse(selected.dataset.addons);

    perks.forEach((perk, index) => {
        const selectEl = document.getElementById(`killerPerk${index + 1}`);

        if (selectEl?.tomselect) {
            selectEl.tomselect.setValue(perk);
        }
    });

    addons.forEach((addon, index) => {
        const selectEl = document.getElementById(`killerAddon${index + 1}`);

        if (selectEl?.tomselect) {
            selectEl.tomselect.setValue(addon);
        }
    });
}

export const killerPresets = {
    initPresets
};