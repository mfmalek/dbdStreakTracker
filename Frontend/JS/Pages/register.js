import { auth } from "../Auth/auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";

function initRegister() {
    if (auth.isLoggedIn()) {
        window.location.href = "/home";
        return;
    }
    document.getElementById("registerButton")?.addEventListener("click", userRegister);
}

async function handleResponse(res) {
    let data;

    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        const message = data?.message || "Something went wrong";
        throw new Error(message);
    }
    return data;
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

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const data = await handleResponse(res);

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        alert("Account created successfully!");
        window.location.href = "/login";
    } catch (err) {
        alert(err.message);
    }
}

export const register = {
    initRegister
};