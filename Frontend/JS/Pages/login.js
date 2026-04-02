import { auth } from "../Modules/auth.js";

const API_URL = "http://localhost:3000/api";

function initLogin() {
    auth.redirectIfLoggedIn();

    if (auth.isLoggedIn()) {
        window.location.href = "home.html";
        return;
    }
    
    document.getElementById("loginButton")?.addEventListener("click", userLogin);
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

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.error || "Login failed");
        return;
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    localStorage.setItem("token", data.token);
    window.location.href = "home.html";
}

export const login = {
    initLogin
};