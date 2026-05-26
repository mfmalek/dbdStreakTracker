import { streakContext } from "../../Core/Utils/streak.context.js";

function syncKillerFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const killer = params.get("killer");

    if (!killer) return;

    try {
        const current = streakContext.getContext();

        if (current.role === "killer") {
            streakContext.setContext({
                role: "killer",
                killerName: killer
            });
        }
    } catch {
        streakContext.setContext({
            role: "killer",
            killerName: killer
        });
    }
}

export const streakShared = {
    syncKillerFromUrl
};