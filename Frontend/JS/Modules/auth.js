const TOKEN_KEY = "token";

function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function logout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
}

function isLoggedIn() {
    return !!getToken();
}

function getUserFromToken() {
    const token = getToken();
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        logout();
        return null;
    }
}

function checkLoggedUser() {
    const user = getUserFromToken();
    const loggedMessage = document.getElementById("welcomeUser");

    if (!user) return;

    if (loggedMessage) {
        loggedMessage.textContent = `Logged in as: ${user.username}`;
    }
}

function requireAuth() {
    const user = getUserFromToken();

    if (!user) {
        window.location.href = "/login";
        return null;
    }
    return user;
}

function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = "/home";
    }
}

export const auth = {
    saveToken,
    getToken,
    logout,
    isLoggedIn,
    getUserFromToken,
    checkLoggedUser,
    requireAuth,
    redirectIfLoggedIn
};