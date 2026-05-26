import { streakContext } from "../../Core/Utils/streak.context.js";
import { formElements } from "./Utils/form.elements.js";
import { matchFormValidation } from "./match.form.validation.js";
import { matchFormState } from "./match.form.state.js";
import { killerController } from "../Killer Streak/killer.controller.js";
import { matchFormUI } from "./match.form.ui.js";
import { sharedMatchForm } from "./shared.match.form.js";
import { killerCore } from "../../Core/Streak/killer.core.js";

async function submitKillerMatch() {
    const { killerName } = streakContext.getContext();
    const mapSelect = formElements.getMapSelect();
    const mapName = mapSelect.value;
    const killsInput = formElements.getKillsInput();
    const kills = Number(killsInput.value);
    const killerPerks = [];
    const killerAddons = [];

    for (let p = 1; p <= killerCore.KILLER_PERK_COUNT; p++) {
        const perkSelect = formElements.getKillerPerkSelect(p);
        killerPerks.push(perkSelect.value);
    }

    for (let a = 1; a <= killerCore.KILLER_ADDON_COUNT; a++) {
        const addonSelect = formElements.getKillerAddonSelect(a);
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

    sharedMatchForm.resetForm();

    if (killerName) {
        const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

        const killerImage = formElements.getKillerImage();
        killerImage.src = `../Images/Portraits/Killers/Portrait_${clean}.png`;
    } else {
        const killerImage = formElements.getKillerImage();
        killerImage.src = "../Images/Miscellaneous/Icon_Killer.png";
    }
}

export const killerMatchSubmitter = {
    submitKillerMatch
};