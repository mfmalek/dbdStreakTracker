import { auth } from "../../Auth/auth.js";
import { sharedCore } from "../../Core/Streak/sharedCore.js";
import { sharedUI } from "../../Features/Core Streak/sharedUI.js";
import { streakContext } from "../../Core/Utils/streakContext.js";

function setupNavbar() {
    const homeBtn = document.getElementById("homeButton");
    const logoutBtn = document.getElementById("logoutButton");

    homeBtn?.addEventListener("click", () => {
        window.location.href = "/home";
    });

    logoutBtn?.addEventListener("click", () => {
        auth.logout();
    });

    const user = auth.getUserFromToken();

    sharedUI.renderNavbar({
        username: user?.username || "Unknown",
        mode: sharedCore.MODE
    });
}

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
    setupNavbar,
    syncKillerFromUrl
};