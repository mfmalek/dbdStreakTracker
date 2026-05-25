import { streakContext } from "../../Core/Utils/streakContext.js";
import { formElements } from "./Utils/formElements.js";
import { matchFormValidation } from "./matchFormValidation.js";
import { matchFormState } from "./matchFormState.js";
import { killerController } from "../Killer Streak/killerController.js";
import { matchFormUI } from "./matchFormUI.js";
import { sharedMatchForm } from "./sharedMatchForm.js";
import { killerCore } from "../../Core/Streak/killerCore.js";

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