import { auth } from "../auth/auth.js";
import { streakContext } from "../core/utils/streak.context.js";
import { killerData } from "../core/data/killer.data.js";
import { navbar } from "../layout/navbar.js";

function initKillerSelection() {
    renderKillers();
    navbar.renderNavbar({ mode: "Killer Selection" });
}

function renderKillers() {
    const container = document.getElementById("killerList");

    killerData.names.forEach(killer => {
        const card = document.createElement("div");
        card.className = "killerCard";
        const clean = killer.replace(/[^a-zA-Z0-9]/g, "");

        card.innerHTML = `
            <img src="../images/portraits/killers/Portrait_${clean}.png" alt="${killer}">
            <span>${killer}</span>
        `;

        card.addEventListener("click", () => selectKiller(killer));
        container.appendChild(card);
    });
}

function selectKiller(killerName) {
    streakContext.setContext({
        role: "killer",
        killerName
    });

    const mode = "killer";
    const encoded = encodeURIComponent(killerName);

    window.location.href = `/streakKiller?killer=${encoded}`;
}

export const killerSelection = {
    initKillerSelection
};