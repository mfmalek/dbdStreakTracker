import { formElements } from "./Utils/form.elements.js";

function resetForm() {
    clearSelects();
    clearInputs();
    clearImages();
}

function clearSelects() {
    document.querySelectorAll("select").forEach(select => {
        if (select.tomselect) {
            select.tomselect.clear();
        } else {
            select.selectedIndex = 0;
        }
    });
}

function clearInputs() {
    document.querySelectorAll("input").forEach(input => {
        if (input.type === "checkbox") {
            input.checked = false;
        } else {
            input.value = "";
        }
    });
}

function clearImages() {
    const killerImage = formElements.getKillerImage();
    const mapImage = formElements.getMapImage();

    killerImage.src = "../Images/Miscellaneous/Icon_Killer.png";
    mapImage.src = "../Images/Maps/Map_GenericMapBackground.png";
}

export const sharedMatchForm = {
    resetForm
};