import { matchesApi } from "../../API/matches.api.js";
import { matchFormState } from "./matchFormState.js";
import { matchFormUI } from "./matchFormUI.js";
import { sharedMatchForm } from "./sharedMatchForm.js";
import { streakContext } from "../../Core/Utils/streakContext.js";
import { survivorMatchForm } from "./survivorMatchForm.js";
import { killerMatchForm } from "./killerMatchForm.js";

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

export const matchEditor = {
    editMatch,
    cancelEditing
};