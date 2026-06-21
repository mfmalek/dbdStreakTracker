import { streakContext } from "../../../core/utils/streak.context.js";
import { survivorMatchSubmitter } from "../services/submission/survivor.match.submitter.js";
import { killerMatchSubmitter } from "../services/submission/killer.match.submitter.js";
import { matchEditor } from "../services/editing/match.editor.js";

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