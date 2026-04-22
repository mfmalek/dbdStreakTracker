import { auth } from "../Auth/auth.js";
import { authApi } from "../API/auth.api.js";

function initLogin() {
    auth.redirectIfLoggedIn();
    document.getElementById("loginButton")?.addEventListener("click", userLogin);
}

function getCredentials() {
    return {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value
    };
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
        const data = await authApi.login(username, password);

        auth.saveToken(data.token);
        window.location.href = "/home";
    } catch (err) {
        alert(err.message);
    }
}

export const login = {
    initLogin
};