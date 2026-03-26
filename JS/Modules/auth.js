function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

function checkLoggedUser() {
    const user = getCurrentUser();
    const loggedMessage = document.getElementById("welcomeUser");

    if(!user) {
        window.location.href = "login.html";
        return;
    } else {
        loggedMessage.textContent = `Logged in as: ${user}`;
    }
}

export const auth = { 
    getCurrentUser,
    checkLoggedUser
}