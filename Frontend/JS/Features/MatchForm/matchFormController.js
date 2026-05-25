import { streakContext } from "../../Core/Utils/streakContext.js";
import { matchFormValidation } from "./matchFormValidation.js";
import { matchesApi } from "../../API/matches.api.js";
import { matchFormState } from "./matchFormState.js";
import { matchFormUI } from "./matchFormUI.js";
import { sharedMatchForm } from "./sharedMatchForm.js";
import { survivorMatchForm } from "./survivorMatchForm.js";
import { killerMatchForm } from "./killerMatchForm.js";
import { survivorController } from "../Survivor Streak/survivorController.js";
import { killerController } from "../Killer Streak/killerController.js";

async function submitMatch() {
    const { role } = streakContext.getContext();

    if (role === "survivor") {
        return submitSurvivorMatch();
    }

    if (role === "killer") {
        return submitKillerMatch();
    }
}

async function submitSurvivorMatch() {
    const survivors = survivorMatchForm.getSurvivors();
    const mapName = document.getElementById("mapName").value;
    const killerName = document.getElementById("killerName").value;
    const killerPerks = [];

    for (let p = 1; p <= 4; p++) {
        killerPerks.push(document.getElementById(`killerPerk${p}`).value);
    }

    if (!matchFormValidation.validateMatchInputs(mapName, killerName)) return;

    const match = {
        survivors,
        mapName,
        killerName,
        killerPerks
    };

    if (matchFormState.isEditing()) {
        const matchId = matchFormState.getEditingMatchId();

        await survivorController.handleEditMatch(matchId, match);
        matchFormState.stopEditing();
        matchFormUI.updateEditingUI();
    } else {
        await survivorController.handleSubmitMatch(match);
    }

    sharedMatchForm.resetForm();
}

async function submitKillerMatch() {
    const { killerName } = streakContext.getContext();
    const mapName = document.getElementById("mapName").value;
    const kills = Number(document.getElementById("kills").value);
    const killsInput = document.getElementById("kills");
    const killerPerks = [];
    const killerAddons = [];

    for (let p = 1; p <= 4; p++) {
        killerPerks.push(document.getElementById(`killerPerk${p}`).value);
    }

    for (let a = 1; a <= 2; a++) {
        killerAddons.push(document.getElementById(`killerAddon${a}`)?.value || "");
    }

    if (!matchFormValidation.validateKillerMatchInputs(mapName, killerName, kills)) return;

    const match = {
        mapName,
        killerPerks,
        killerAddons,
        kills
    };

    if (matchFormState.isEditing()) {
        const matchId = matchFormState.getEditingMatchId();

        await killerController.handleEditMatch(matchId, match);
        matchFormState.stopEditing();
        matchFormUI.updateEditingUI();
    } else {
        await killerController.handleSubmitMatch(match);
    }

    if (killsInput) {
        killsInput.value = "";
    }

    sharedMatchForm.resetForm();

    if (killerName) {
        const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

        document.getElementById("killerImage").src = `../Images/Portraits/Killers/Portrait_${clean}.png`;
    } else {
        document.getElementById("killerImage").src = "../Images/Miscellaneous/Icon_Killer.png";
    }
}

async function editMatch(matchId) {
    const matches = await matchesApi.getMatches();
    const match = matches.find(m => m.id === matchId);

    if (!match) {
        alert("Match not found.");
        return;
    }

    matchFormState.startEditing(matchId);
    matchFormUI.updateEditingUI();
    populateFormForEditing(match);
}

function cancelEditing() {
    matchFormState.stopEditing();
    sharedMatchForm.resetForm();
    matchFormUI.updateEditingUI();
}

function populateFormForEditing(match) {
    const { role } = streakContext.getContext();

    if (role === "survivor") {
        survivorMatchForm.populateSurvivorMatch(match);
    } else {
        killerMatchForm.populateKillerMatch(match);
    }
}

export const matchFormController = {
    submitMatch,
    editMatch,
    cancelEditing
};