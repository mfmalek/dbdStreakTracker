import { http } from "./http.client.js";

async function getProfile() {
    return http.get("/profile/me");
}

async function getStreaks() {
    return http.get("/profile/streaks");
}

async function changeUsername(newUsername) {
    return http.patch("/profile/username", {
        newUsername
    });
}

async function changePassword(currentPassword, newPassword) {
    return http.patch("/profile/password", {
        currentPassword,
        newPassword
    });
}

async function deleteAccount(password) {
    return http.del(
        "/profile/delete",
        null,
        { password }
    );
}

export const profileApi = {
    getProfile,
    getStreaks,
    changeUsername,
    changePassword,
    deleteAccount
};