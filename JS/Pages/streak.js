import { auth } from "../Modules/auth.js";
import { dbdCore } from "../Modules/streakCore.js";
import { dbdPresets } from "../Modules/streakPresets.js";
import { dbdStorage } from "../Modules/streakStorage.js";
import { dbdUI } from "../Modules/streakUI.js";
import { dbdListeners } from "../Modules/streakListeners.js";
import { dbdController } from "../Modules/streakController.js";

function initStreak() {
    const matches = dbdStorage.getMatches() || [];

    auth.checkLoggedUser();
    dbdUI.initUI();
    dbdUI.renderTable(matches);
    dbdController.handleRenderStats();
    dbdCore.initCore();
    dbdPresets.initPresets();
    dbdListeners.initListeners({
        ui: dbdUI,
        saveConfigs,
        submitMatch,
        deleteTableMatch,
        clearTableMatches,
        resetBestStreak: dbdController.handleResetBestStreak
    });
}

function saveConfigs() {
    const configs = [];

    for (let i = 1; i <= dbdCore.SURVIVOR_COUNT; i++) {
        configs.push({
            name: document.getElementById(`nicknameSurv${i}`)?.textContent || `Surv${i}`,
            image: document.getElementById(`imageSurv${i}`)?.src.split("/").pop()
        });
    }
    dbdStorage.saveSurvivorConfigs(configs);
}

function getSurvivors() {
    const survivors = [];

    for(let s = 1; s <= dbdCore.SURVIVOR_COUNT; s++) {
        const perks = [];

        for(let p = 1; p <= 4; p++) {
            const select = document.getElementById(`perk${p}Surv${s}`);

            perks.push(select?.value || "");
        }

        survivors.push({
            name: `Surv${s}`,
            perks,
            survived: document.getElementById(`surv${s}Survived`)?.checked || false
        });
    }
    return survivors;
}

function submitMatch() {
    const survivors = getSurvivors();
    const mapName = document.getElementById("mapName").value;
    const killerName = document.getElementById("killerName").value;
    const killerPerks = [];
    for(let p = 1; p <= 4; p++) {
        killerPerks.push(document.getElementById(`killerPerk${p}`).value);
    }

    if(!validateMatchInputs(mapName, killerName)) return;

    const match = {
        survivors,
        mapName,
        killerName,
        killerPerks
    };

    dbdController.handleSubmitMatch(match);
    resetForm();
}

function validateMatchInputs(mapName, killerName) {
    if(!killerName) {
        alert("Please select a killer.");
        return false;
    }
    if(!mapName) {
        alert("Please select a map.");
        return false;
    }
    return true;
}

function deleteTableMatch() {
    const input = document.getElementById("deleteMatchNumber");
    const index = parseInt(input?.value) - 1;
    const matches = dbdStorage.getMatches();

    if(isNaN(index)) {
        alert("Please enter a valid match number.");
        return;
    }
    if(index < 0 || index >= matches.length) {
        alert(`Match #${index + 1} does not exist. You currently have ${matches.length} matches.`);
        return;
    }
    const matchPreview = dbdUI.createMatchPreview(matches[index]);
    const confirmDelete = confirm(`Are you sure you want to delete match #${index + 1}?
        \n\n${matchPreview}
        `);
    if(!confirmDelete) return;

    dbdController.handleDeleteMatch(index);
    input.value = "";
}

function clearTableMatches() {
    const confirmClear = confirm("Are you sure you want to clear ALL matches?");
    if(!confirmClear) return;
    
    dbdController.handleClearMatches();
}

function resetForm() {
    const deleteMatchInput = document.getElementById("deleteMatchNumber");

    document.querySelectorAll('select').forEach(select => {
        if(select.tomselect) {
            select.tomselect.clear();
        } else {
            select.selectedIndex = 0;
        }
    });

    for(let s = 1; s <= dbdCore.SURVIVOR_COUNT; s++) {
        const checkbox = document.getElementById(`surv${s}Survived`);
        
        if(checkbox) checkbox.checked = false;
    }

    document.getElementById("killerImage").src = "../Images/Miscellaneous/Icon_Killer.png";
    document.getElementById("mapImage").src = "../Images/Maps/Map_GenericMapBackground.png";
    deleteMatchInput.value = "";
}

export const streak = {
    initStreak
}