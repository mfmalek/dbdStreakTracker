import { streakContext } from "../../Core/Utils/streak.context.js";
import { survivorMatchSubmitter } from "./survivor.match.submitter.js";
import { killerMatchSubmitter } from "./killer.match.submitter.js";
import { matchEditor } from "./match.editor.js";

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