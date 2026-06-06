import { auth } from "../Auth/auth.js";

function renderNavbar({ mode }) {
    const user = auth.getUserFromToken();
    const modeText = document.getElementById("modeIndicator");
    const usernameText = document.getElementById("welcomeUser");
    const profileBtn = document.getElementById("profileButton");

    if (modeText) {
        modeText.innerHTML = `<span id="modeType">${mode.toUpperCase()}</span>`;
    }

    if (usernameText) {
        usernameText.textContent = user?.username || "Unknown User";
    }

    if (mode === "profile") {
        profileBtn?.remove();
    }
    setupNavbarListeners();
}

function setupNavbarListeners() {
    const homeBtn = document.getElementById("homeButton");
    const profileBtn = document.getElementById("profileButton");
    const logoutBtn = document.getElementById("logoutButton");

    homeBtn?.addEventListener("click", () => {
        window.location.href = "/home";
    });

    profileBtn?.addEventListener("click", () => {
        window.location.href = "/profile";
    });

    logoutBtn?.addEventListener("click", () => {
        auth.logout();
    });
}

export const navbar = {
    renderNavbar
};