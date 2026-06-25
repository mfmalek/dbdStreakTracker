import { previewFormatter } from "../../shared-streak/index.js";

function createMatchPreview(match) {
    if (!match) return "Match not found.";

    return `
        \tKills: ${match.result === "win" ? "[✅]" : "[☠️]"} ${match.kills ?? "N/A"}
        Perks: ${previewFormatter.formatPerks(match.killerPerks)}
        Add-ons: ${previewFormatter.formatAddons(match.killerAddons)}
        Map: ${previewFormatter.formatMap(match.mapName)}
    `.trim();
}

export const killerMatchPreview = {
    createMatchPreview
};