import { auth } from "../Modules/auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";

function initRegister() {
    if (auth.isLoggedIn()) {
        window.location.href = "/home";
        return;
    }
    document.getElementById("registerButton")?.addEventListener("click", userRegister);
}

function getCredentials() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    return { username, password, confirmPassword };
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
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (!res.ok) {
        alert(data.error || "Register failed");
        return;
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    alert("Account created successfully!");
    window.location.href = "/login";
}

export const register = {
    initRegister
};