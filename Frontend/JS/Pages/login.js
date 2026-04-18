import { auth } from "../Modules/auth.js";

const API_URL = "https://dbdstreaktracker.onrender.com/api";

function initLogin() {
    auth.redirectIfLoggedIn();

    if (auth.isLoggedIn()) {
        window.location.href = "/home";
        return;
    }
    document.getElementById("loginButton")?.addEventListener("click", userLogin);
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
    return { username, password };
}

function validateCredentials(username, password) {
    if (!username) {
        alert("Username is required.");
        return false;
    }

    if (!password) {
        alert("Password is required.");
        return false;
    }
    return true;
}

async function userLogin() {
    const { username, password } = getCredentials();

    if (!validateCredentials(username, password)) return;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        const data = await handleResponse(res);

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        localStorage.setItem("token", data.token);
        window.location.href = "/home";
    } catch (err) {
        alert(err.message);
    }
}

export const login = {
    initLogin
};