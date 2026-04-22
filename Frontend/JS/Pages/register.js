import { auth } from "../Auth/auth.js";
import { authApi } from "../api/auth.api.js";

function initRegister() {
    if (auth.isLoggedIn()) {
        window.location.href = "/home";
        return;
    }
    document.getElementById("registerButton")?.addEventListener("click", userRegister);
}

function getCredentials() {
    return {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value
    };
}

function validateCredentials(username, password, confirmPassword) {
    if (!username) {
        alert("Username is required.");
        return false;
    }
    if (!password) {
        alert("Password is required.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

async function userRegister() {
    const { username, password, confirmPassword } = getCredentials();
    if (!validateCredentials(username, password, confirmPassword)) return;

    try {
        await authApi.register(username, password);
        alert("Account created successfully!");
        window.location.href = "/login";
    } catch (err) {
        alert(err.message);
    }
}

export const register = {
    initRegister
};