import { survivorCore } from "../../Core/Streak/survivorCore.js";
import { streakContext } from "../../Core/Utils/streakContext.js";
import { matchesApi } from "../../API/matches.api.js";
import { killerUI } from "../../Features/Killer Streak/killerUI.js";
import { survivorController } from "../../Features/Survivor Streak/survivorController.js";
import { killerController } from "../../Features/Killer Streak/killerController.js";

async function submitMatch() {
    const { role } = streakContext.getContext();

    if (role === "survivor") {
        return submitSurvivorMatch();
    }

    if (role === "killer") {
        return submitKillerMatch();
    }
}

function getSurvivors() {
    const survivors = [];

    for (let s = 1; s <= survivorCore.SURVIVOR_COUNT; s++) {
        const perks = [];

        for (let p = 1; p <= 4; p++) {
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

async function submitSurvivorMatch() {
    const survivors = getSurvivors();

    const mapName = document.getElementById("mapName").value;
    const killerName = document.getElementById("killerName").value;

    const killerPerks = [];

    for (let p = 1; p <= 4; p++) {
        killerPerks.push(
            document.getElementById(`killerPerk${p}`).value
        );
    }

    if (!validateMatchInputs(mapName, killerName)) return;

    const match = {
        survivors,
        mapName,
        killerName,
        killerPerks
    };

    await survivorController.handleSubmitMatch(match);

    resetForm();
}

async function submitKillerMatch() {
    const { killerName } = streakContext.getContext();

    const mapName = document.getElementById("mapName").value;
    const kills = Number(
        document.getElementById("kills")?.value || 0
    );

    const killsInput = document.getElementById("kills");

    const killerPerks = [];

    for (let p = 1; p <= 4; p++) {
        killerPerks.push(
            document.getElementById(`killerPerk${p}`).value
        );
    }

    const killerAddons = [];

    for (let a = 1; a <= 2; a++) {
        killerAddons.push(
            document.getElementById(`killerAddon${a}`)?.value || ""
        );
    }

    if (!validateKillerMatchInputs(mapName, killerName)) return;

    const match = {
        mapName,
        killerPerks,
        killerAddons,
        kills
    };

    await killerController.handleSubmitMatch(match);

    if (killsInput) {
        killsInput.value = "";
    }

    resetForm();

    if (killerName) {
        const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

        document.getElementById("killerImage").src =
            `../Images/Portraits/Killers/Portrait_${clean}.png`;
    } else {
        document.getElementById("killerImage").src =
            "../Images/Miscellaneous/Icon_Killer.png";
    }
}

function validateMatchInputs(mapName, killerName) {
    if (!killerName) {
        alert("Please select a killer.");
        return false;
    }

    if (!mapName) {
        alert("Please select a map.");
        return false;
    }

    return true;
}

function validateKillerMatchInputs(mapName, killerName) {
    if (!killerName) {
        alert("Killer not defined.");
        return false;
    }

    if (!mapName) {
        alert("Please select a map.");
        return false;
    }

    return true;
}

async function deleteTableMatch() {
    const input = document.getElementById("deleteMatchNumber");
    const index = parseInt(input?.value) - 1;
    const matches = await matchesApi.getMatches();
    const { role } = streakContext.getContext();

    if (isNaN(index)) {
        alert("Please enter a valid match number.");
        return;
    }

    if (index < 0 || index >= matches.length) {
        alert(
            `Match #${index + 1} does not exist. ` +
            `You currently have ${matches.length} matches.`
        );

        return;
    }

    const match = matches[index];

    const controller =
        role === "killer"
            ? killerController
            : survivorController;

    const preview =
        role === "killer"
            ? killerUI.createMatchPreview(match)
            : await survivorController.handleCreateMatchPreview(match);

    const confirmDelete = confirm(
        `Are you sure you want to delete match #${index + 1}?\n\n${preview}`
    );

    if (!confirmDelete) return;

    await controller.handleDeleteMatch(match.id);

    input.value = "";
}

async function clearTableMatches() {
    const confirmClear = confirm(
        "Are you sure you want to clear ALL matches?"
    );

    if (!confirmClear) return;

    const { role } = streakContext.getContext();

    if (role === "survivor") {
        await survivorController.handleClearMatches();
    } else {
        await killerController.handleClearMatches();
    }
}

function resetForm() {
    const deleteMatchInput =
        document.getElementById("deleteMatchNumber");

    document.querySelectorAll("select").forEach(select => {
        if (select.tomselect) {
            select.tomselect.clear();
        } else {
            select.selectedIndex = 0;
        }
    });

    for (let s = 1; s <= survivorCore.SURVIVOR_COUNT; s++) {
        const checkbox =
            document.getElementById(`surv${s}Survived`);

        if (checkbox) {
            checkbox.checked = false;
        }
    }

    document.getElementById("killerImage").src =
        "../Images/Miscellaneous/Icon_Killer.png";

    document.getElementById("mapImage").src =
        "../Images/Maps/Map_GenericMapBackground.png";

    deleteMatchInput.value = "";
}

export const streakActions = {
    submitMatch,
    deleteTableMatch,
    clearTableMatches
};