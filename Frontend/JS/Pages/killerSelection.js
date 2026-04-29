import { killerData } from "../Core/Data/killerData.js";
import { streakContext } from "../Core/Utils/streakContext.js";

function initKillerSelection() {
    renderKillers();
}

function renderKillers() {
    const container = document.getElementById("killerList");

    killerData.names.forEach(killer => {
        const btn = document.createElement("button");

        btn.textContent = killer;
        btn.addEventListener("click", () => selectKiller(killer));
        container.appendChild(btn);
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