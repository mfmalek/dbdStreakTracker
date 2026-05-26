import { killerCore } from "../../Core/Streak/killer.core.js";
import { survivorMatchForm } from "./survivor.match.form.js";
import { formElements } from "./Utils/form.elements.js";
import { matchFormValidation } from "./match.form.validation.js";
import { matchFormState } from "./match.form.state.js";
import { survivorController } from "../Survivor Streak/survivor.controller.js";
import { matchFormUI } from "./match.form.ui.js";
import { sharedMatchForm } from "./shared.match.form.js";

async function submitSurvivorMatch() {
    const survivors = survivorMatchForm.getSurvivors();
    const mapSelect = formElements.getMapSelect();
    const killerSelect = formElements.getKillerSelect();
    const mapName = mapSelect.value;
    const killerName = killerSelect.value;
    const killerPerks = [];

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const perkSelect = formElements.getKillerPerkSelect(p);
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

    sharedMatchForm.resetForm();
}

export const survivorMatchSubmitter = {
    submitSurvivorMatch
};