import { sharedPreviewUI } from "../SharedUI/shared.preview.ui.js";

function createMatchPreview(match) {
    if (!match) return "Match not found.";

    return `
        \tKills: ${match.result === "win" ? "[✅]" : "[☠️]"} ${match.kills ?? "N/A"}
        Perks: ${sharedPreviewUI.formatPerks(match.killerPerks)}
        Add-ons: ${sharedPreviewUI.formatAddons(match.killerAddons)}
        Map: ${sharedPreviewUI.formatMap(match.mapName)}
    `.trim();
}

export const killerPreviewUI = {
    createMatchPreview
};