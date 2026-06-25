import { previewFormatter } from "../../shared-streak/index.js";

function createMatchPreview(match, names) {
    if (!match) return "Match not found.";

    let preview = "";

    match.survivors?.forEach((surv, i) => {
        const name = names?.[i] || `Surv${i + 1}`;
        const status = previewFormatter.formatStatus(surv.survived);

        preview += `${status} ${name}: ${previewFormatter.formatPerks(surv.perks)}\n`;
    });

    preview += `
        \nKiller: ${match.killerName || "Unknown Killer"}
        \nPerks: ${previewFormatter.formatPerks(match.killerPerks)}
        \n\nMap: ${previewFormatter.formatMap(match.mapName)}
    `;

    return preview.trim();
}

export const survivorMatchPreview = {
    createMatchPreview
};