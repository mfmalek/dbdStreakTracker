function formatStatus(condition, success = "[✅]", fail = "[☠️]") {
    return condition ? success : fail;
}

function formatPerks(perks) {
    return formatList(perks);
}

function formatAddons(addons) {
    return formatList(addons);
}

function formatMap(mapName) {
    return mapName || "Unknown";
}

function formatList(items, fallback = "N/A") {
    return items?.join(", ") || fallback;
}

export const sharedPreviewUI = {
    formatStatus,
    formatPerks,
    formatAddons,
    formatMap
};