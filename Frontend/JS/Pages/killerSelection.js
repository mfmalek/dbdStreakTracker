import { killerData } from "../Core/Data/killerData.js";
import { streakContext } from "../Core/Utils/streakContext.js";

function initKillerSelection() {
    renderKillers();
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
    const mode = sessionStorage.getItem("selectedMode") || "solo";
    window.location.href = `/streak${capitalize(mode)}`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const killerSelection = {
    initKillerSelection
};