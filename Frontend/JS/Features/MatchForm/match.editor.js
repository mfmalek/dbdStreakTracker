import { matchesApi } from "../../API/matches.api.js";
import { matchFormState } from "./match.form.state.js";
import { matchFormUI } from "./match.form.ui.js";
import { sharedMatchForm } from "./shared.match.form.js";
import { streakContext } from "../../Core/Utils/streak.context.js";
import { survivorMatchForm } from "./survivor.match.form.js";
import { killerMatchForm } from "./killer.match.form.js";

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