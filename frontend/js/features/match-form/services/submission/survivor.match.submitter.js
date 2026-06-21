import { killerCore } from "../../../../core/streak/killer.core.js";
import { survivorController } from "../../../survivor-streak/survivor.controller.js";

import { matchFormElements } from "../../dom/match.form.elements.js";

import { survivorMatchForm } from "../../ui/survivor.match.form.js";
import { matchFormReset } from "../../shared/match.form.reset.js";
import { matchFormState } from "../../state/match.form.state.js";
import { matchFormValidation } from "../../validation/match.form.validation.js";

import { matchFormUI } from "../../ui/match.form.ui.js";

async function submitSurvivorMatch() {
    const survivors = survivorMatchForm.getSurvivors();
    const mapSelect = matchFormElements.getMapSelect();
    const killerSelect = matchFormElements.getKillerSelect();
    const mapName = mapSelect.value;
    const killerName = killerSelect.value;
    const killerPerks = [];

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const perkSelect = matchFormElements.getKillerPerkSelect(p);
        killerPerks.push(perkSelect.value);
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

    matchFormReset.resetForm();
}

export const survivorMatchSubmitter = {
    submitSurvivorMatch
};