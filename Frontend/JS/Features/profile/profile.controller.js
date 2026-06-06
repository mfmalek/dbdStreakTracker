import { profileApi } from "../../API/profile.api.js";
import { auth } from "../../Auth/auth.js";

async function changeUsername() {
    const input = document.getElementById("newUsername");
    const newUsername = input.value.trim();

    if (!newUsername) {
        alert("Please enter a username.");
        return;
    }

    await profileApi.changeUsername(newUsername);
    alert("Username changed successfully. Please login again.");
    auth.logout();
}

async function changePassword() {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    if (!currentPassword || !newPassword) {
        alert("Please fill all fields.");
        return;
    }

    await profileApi.changePassword(currentPassword, newPassword);

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";

    alert("Password changed successfully.");
}

async function deleteAccount() {
    const password = document.getElementById("deletePassword").value;

    if (!password) {
        alert("Please enter your password.");
        return;
    }

    const confirmed = confirm("This action is permanent. Are you sure you want to delete your account?");

    if (!confirmed) return;

    await profileApi.deleteAccount(password);
    alert("Account deleted successfully.");
    auth.logout();
}

export const profileController = {
    changeUsername,
    changePassword,
    deleteAccount
};