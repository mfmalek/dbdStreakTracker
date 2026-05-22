import { auth } from "../Auth/auth.js";

function renderNavbar({ mode }) {
    const user = auth.getUserFromToken();
    const modeText = document.getElementById("modeIndicator");
    const usernameText = document.getElementById("welcomeUser");

    if (modeText) {
        modeText.innerHTML = `<span id="modeType">${mode.toUpperCase()}</span>`;
    }

    if (usernameText) {
        usernameText.textContent = user?.username || "Unknown User";
    }
    setupNavbarListeners();
}

function setupNavbarListeners() {
    const homeBtn = document.getElementById("homeButton");
    const logoutBtn = document.getElementById("logoutButton");

    homeBtn?.addEventListener("click", () => {
        window.location.href = "/home";
    });

    logoutBtn?.addEventListener("click", () => {
        auth.logout();
    });
}

export const navbar = {
    renderNavbar
};