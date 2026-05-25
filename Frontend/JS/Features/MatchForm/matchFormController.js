import { streakContext } from "../../Core/Utils/streakContext.js";
import { survivorMatchSubmitter } from "./survivorMatchSubmitter.js";
import { killerMatchSubmitter } from "./killerMatchSubmitter.js";
import { matchEditor } from "./matchEditor.js";

async function submitMatch() {
    const { role } = streakContext.getContext();

    if (role === "survivor") {
        return survivorMatchSubmitter.submitSurvivorMatch();
    }

    if (role === "killer") {
        return killerMatchSubmitter.submitKillerMatch();
    }
}

export const matchFormController = {
    submitMatch,
    editMatch: matchEditor.editMatch,
    cancelEditing: matchEditor.cancelEditing
};