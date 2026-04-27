import { auth } from "../Auth/auth.js";
import { streakContext } from "../Core/Utils/streakContext.js";

let selectedRole = null;

function initHome() {
    const user = auth.requireAuth();
    if (!user) return;

    auth.checkLoggedUser();
    setupRoleSelection();
    setupNavigation();
}

function setupRoleSelection() {
    const roleButtons = document.querySelectorAll(".roleButton");
    const modeContainer = document.getElementById("modeContainer");
    const survivorModes = document.getElementById("survivorModes");
    const killerMode = document.getElementById("killerMode");

    roleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            selectedRole = btn.dataset.role;
            modeContainer.classList.remove("hidden");

            if (selectedRole === "survivor") {
                survivorModes.classList.remove("hidden");
                killerMode.classList.add("hidden");
            } else {
                survivorModes.classList.add("hidden");
                killerMode.classList.remove("hidden");
            }
        });
    });
}

function setupNavigation() {
    document.querySelectorAll(".streakButton").forEach(btn => {
        btn.addEventListener("click", () => {
            if (selectedRole !== "survivor") return;

            const mode = btn.dataset.mode;
            streakContext.setContext({
                role: "survivor"
            });
            window.location.href = `/streak${capitalize(mode)}`;
        });
    });

    document.querySelector(".killerButton")?.addEventListener("click", () => {
        if (selectedRole !== "killer") return;
        sessionStorage.setItem("selectedMode", "standard");
        window.location.href = "/killerSelection";
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const home = {
    initHome
};