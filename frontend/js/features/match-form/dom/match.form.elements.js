function getMapSelect() {
    return document.getElementById("mapName");
}

function getKillerSelect() {
    return document.getElementById("killerName");
}

function getKillsInput() {
    return document.getElementById("kills");
}

function getKillerImage() {
    return document.getElementById("killerImage");
}

function getMapImage() {
    return document.getElementById("mapImage");
}

function getKillerPerkSelect(index) {
    return document.getElementById(`killerPerk${index}`);
}

function getKillerAddonSelect(index) {
    return document.getElementById(`killerAddon${index}`);
}

function getSurvivorPerkSelect(survivorIndex, perkIndex) {
    return document.getElementById(`perk${perkIndex}Surv${survivorIndex}`);
}

function getSurvivorCheckbox(index) {
    return document.getElementById(`surv${index}Survived`);
}

export const matchFormElements = {
    getMapSelect,
    getKillerSelect,
    getKillsInput,
    getKillerImage,
    getMapImage,
    getKillerPerkSelect,
    getKillerAddonSelect,
    getSurvivorPerkSelect,
    getSurvivorCheckbox
};