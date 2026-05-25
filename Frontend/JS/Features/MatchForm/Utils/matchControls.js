function getDeleteMatchInput() {
    return document.getElementById("deleteMatchNumber");
}

function getSubmitMatchButton() {
    return document.getElementById("submitMatchButton");
}

function getCancelEditButton() {
    return document.getElementById("cancelEditButton");
}

function getClearAllMatchesButton() {
    return document.getElementById("clearMatchesButton");
}

function getDeleteMatchButton() {
    return document.getElementById("deleteMatchButton");
}

export const matchControls = {
    getDeleteMatchInput,
    getSubmitMatchButton,
    getCancelEditButton,
    getClearAllMatchesButton,
    getDeleteMatchButton,
};