function initLogin() {
    document.getElementById("loginButton")?.addEventListener("click", userLogin);
    document.getElementById("registerButton")?.addEventListener("click", userRegister);
}

function getCredentials() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    return { username, password };
}

function validateCredentials(username, password) {
    if(!username) {
        alert("Username is required.");
        return false;
    }

    if(!password) {
        alert("Password is required.");
        return false;
    }
    return true;
}

function userLogin() {
    const { username, password } = getCredentials();

    if(!validateCredentials(username, password)) return;
    localStorage.setItem("currentUser", username);
    redirectTo("home");
}

function userRegister() {
    const { username, password } = getCredentials();

    if(!validateCredentials(username, password)) return;
    alert(`User ${username} registered.`);
}

function redirectTo(page) {
    window.location.href = `${page}.html`;
}

export const login = {
    initLogin
}