function getStreakTitle() {
    return document.getElementById("streakTitle");
}

function getRuleset() {
    return document.getElementById("ruleset");
}

function getSurvivorContainer() {
    return document.getElementById("survivorContainer");
}

function getSurvivorPortraitGrid(survivorIndex) {
    return document.getElementById(`portraitGridSurv${survivorIndex}`);
}

function getGroupMembersContainer() {
    return document.getElementById("groupMembersContainer");
}

function getInvitesContainer() {
    return document.getElementById("invitesContainer");
}

function getTableBody() {
    return document.getElementById("matchTableBody");
}

function getCurrentStreak() {
    return document.getElementById("currentStreak");
}

function getBestStreak() {
    return document.getElementById("bestStreak");
}

export const uiElements = {
    getStreakTitle,
    getRuleset,
    getSurvivorContainer,
    getSurvivorPortraitGrid,
    getGroupMembersContainer,
    getInvitesContainer,
    getTableBody,
    getCurrentStreak,
    getBestStreak
};