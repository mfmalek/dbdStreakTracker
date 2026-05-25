let editingMatchId = null;

function startEditing(matchId) {
    editingMatchId = matchId;
}

function stopEditing() {
    editingMatchId = null;
}

function isEditing() {
    return editingMatchId !== null;
}

function getEditingMatchId() {
    return editingMatchId;
}

export const matchFormState = {
    startEditing,
    stopEditing,
    isEditing,
    getEditingMatchId
};