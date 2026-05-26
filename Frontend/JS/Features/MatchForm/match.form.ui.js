import { matchFormState } from "./match.form.state.js";
import { matchControls } from "./Utils/match.controls.js";

function updateEditingUI() {
    const submitBtn = matchControls.getSubmitMatchButton();
    const cancelBtn = matchControls.getCancelEditButton();

    if (!submitBtn) return;

    if (matchFormState.isEditing()) {
        submitBtn.textContent = "Edit Match";

        if (cancelBtn) {
            cancelBtn.classList.remove("hidden");
        }
    } else {
        submitBtn.textContent = "Submit Match";

        if (cancelBtn) {
            cancelBtn.classList.add("hidden");
        }
    }
}

export const matchFormUI = {
    updateEditingUI
};