import { auth } from "../auth/auth.js";

import { profileApi } from "../api/profile.js";

import { profileController } from "../features/profile/profile.controller.js";
import { profileListeners } from "../features/profile/profile.listeners.js";

import { navbar } from "../features/shared/index.js";

async function initProfile() {
    const loading = document.getElementById("loadingScreen");

    loading.style.display = "flex";

    try {
        const user = auth.requireAuth();

        if (!user) return;

        auth.checkLoggedUser();

        navbar.renderNavbar({ mode: "profile" });

        await loadProfile();
        await loadStreaks();

        profileListeners.initListeners({
            changeUsername: profileController.changeUsername,
            changePassword: profileController.changePassword,
            deleteAccount: profileController.deleteAccount
        });
    } finally {
        loading.style.display = "none";
    }
}

async function loadProfile() {
    const profile = await profileApi.getProfile();
    const usernameEl = document.getElementById("profileUsername");
    const createdAtEl = document.getElementById("profileCreatedAt");

    if (usernameEl) {
        usernameEl.textContent = profile.username;
    }

    if (createdAtEl) {
        createdAtEl.textContent = new Date(profile.createdAt).toLocaleDateString();
    }
}

async function loadStreaks() {
    const streaks = await profileApi.getStreaks();
    const container = document.getElementById("profileStreaks");

    if (!container) return;

    container.innerHTML = "";

    if (streaks.length === 0) {
        container.innerHTML = `
            <div class="emptyState">
                No streaks recorded yet.
            </div>
        `;
        return;
    }

    streaks.forEach(streak => {
        const card = document.createElement("div");
        const streakName = streak.role === "killer" ? streak.killerName : `${streak.mode.charAt(0).toUpperCase() + streak.mode.slice(1)} Survivor`;

        card.className = "profileStreakCard";

        card.innerHTML = `
            <h3>${streakName}</h3>

            <p>Current: ${streak.current}</p>
            <p>Best: ${streak.best}</p>
        `;

        container.appendChild(card);
    });
}

export const profile = {
    initProfile
};