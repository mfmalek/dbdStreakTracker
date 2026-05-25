import { matchFormState } from "./matchFormState.js";

function updateEditingUI() {
    const submitBtn = document.getElementById("submitMatchButton");
    const cancelBtn = document.getElementById("cancelEditButton");

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