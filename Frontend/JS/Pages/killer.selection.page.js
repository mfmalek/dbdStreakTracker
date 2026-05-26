import { auth } from "../Auth/auth.js";
import { killerData } from "../Core/Data/killer.data.js";
import { streakContext } from "../Core/Utils/streak.context.js";
import { navbar } from "../Layout/navbar.js";

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
            <img src="../Images/Portraits/Killers/Portrait_${clean}.png" alt="${killer}">
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