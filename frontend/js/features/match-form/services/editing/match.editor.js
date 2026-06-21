import { matchesApi } from "../../../../api/matches.js";

import { streakContext } from "../../../../core/utils/streak.context.js";

import { survivorMatchForm } from "../../ui/survivor.match.form.js";
import { killerMatchForm } from "../../ui/killer.match.form.js";
import { matchFormReset } from "../../shared/match.form.reset.js";
import { matchFormState } from "../../state/match.form.state.js";

import { matchFormUI } from "../../ui/match.form.ui.js";

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
    matchFormReset.resetForm();
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