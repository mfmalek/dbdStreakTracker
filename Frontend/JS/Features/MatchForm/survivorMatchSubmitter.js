import { killerCore } from "../../Core/Streak/killerCore.js";
import { survivorMatchForm } from "./survivorMatchForm.js";
import { formElements } from "./Utils/formElements.js";
import { matchFormValidation } from "./matchFormValidation.js";
import { matchFormState } from "./matchFormState.js";
import { survivorController } from "../Survivor Streak/survivorController.js";
import { matchFormUI } from "./matchFormUI.js";
import { sharedMatchForm } from "./sharedMatchForm.js";

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