import { sharedPreviewUI } from "../SharedUI/sharedPreviewUI.js";

function createMatchPreview(match, names) {
    if (!match) return "Match not found.";

    let preview = "";

    match.survivors?.forEach((surv, i) => {
        const name = names?.[i] || `Surv${i + 1}`;
        const status = sharedPreviewUI.formatStatus(surv.survived);

        preview += `${status} ${name}: ${sharedPreviewUI.formatPerks(surv.perks)}\n`;
    });

    preview += `
        \nKiller: ${match.killerName || "Unknown Killer"}
        \nPerks: ${sharedPreviewUI.formatPerks(match.killerPerks)}
        \n\nMap: ${sharedPreviewUI.formatMap(match.mapName)}
    `;

    return preview.trim();
}

export const survivorPreviewUI = {
    createMatchPreview
};