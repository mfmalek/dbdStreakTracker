import { streakContext } from "../../../../core/utils/streak.context.js";

import { killerCore } from "../../../../core/streak/killer.core.js";
import { killerController } from "../../../killer-streak/index.js";

import { matchFormElements } from "../../dom/match.form.elements.js";
import { matchFormReset } from "../../shared/match.form.reset.js";
import { matchFormValidation } from "../../validation/match.form.validation.js";
import { matchFormState } from "../../state/match.form.state.js";

import { matchFormUI } from "../../ui/match.form.ui.js";

async function submitKillerMatch() {
    const { killerName } = streakContext.getContext();
    const mapSelect = matchFormElements.getMapSelect();
    const mapName = mapSelect.value;
    const killsInput = matchFormElements.getKillsInput();
    const kills = Number(killsInput.value);
    const killerPerks = [];
    const killerAddons = [];

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const perkSelect = matchFormElements.getKillerPerkSelect(p);
        killerPerks.push(perkSelect.value);
    }

    for (let a = 1; a <= killerCore.KILLER_ADDON_COUNT; a++) {
        const addonSelect = matchFormElements.getKillerAddonSelect(a);
        killerAddons.push(addonSelect?.value || "");
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

    matchFormReset.resetForm();

    if (killerName) {
        const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

        const killerImage = matchFormElements.getKillerImage();
        killerImage.src = `../images/portraits/killers/Portrait_${clean}.png`;
    } else {
        const killerImage = matchFormElements.getKillerImage();
        killerImage.src = "../images/miscellaneous/Icon_Killer.png";
    }
}

export const killerMatchSubmitter = {
    submitKillerMatch
};