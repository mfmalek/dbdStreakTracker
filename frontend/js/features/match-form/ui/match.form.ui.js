import { matchControls } from "../dom/match.controls.js";
import { matchFormState } from "../state/match.form.state.js";

const LABELS = Object.freeze({
    submit: "Submit Match",
    edit: "Edit Match"
});

function updateEditingUI() {
    const submitBtn = matchControls.getSubmitMatchButton();
    const cancelBtn = matchControls.getCancelEditButton();

    if (!submitBtn) return;

    if (matchFormState.isEditing()) {
        submitBtn.textContent = LABELS.edit;

        if (cancelBtn) {
            cancelBtn.classList.remove("hidden");
        }
    } else {
        submitBtn.textContent = LABELS.submit;

        if (cancelBtn) {
            cancelBtn.classList.add("hidden");
        }
    }
}

export const matchFormUI = {
    updateEditingUI
};