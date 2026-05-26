function validateMatchInputs(mapName, killerName) {
    if (!killerName) {
        alert("Please select a killer.");
        return false;
    }

    if (!mapName) {
        alert("Please select a map.");
        return false;
    }

    return true;
}

function validateKillerMatchInputs(mapName, killerName, kills) {
    if (!validateMatchInputs(mapName, killerName)) {
        return false;
    }

    if (!kills && kills !== 0) {
        alert("Please enter the number of kills.");
        return false;
    }

    return true;
}

export const matchFormValidation = {
    validateMatchInputs,
    validateKillerMatchInputs
};