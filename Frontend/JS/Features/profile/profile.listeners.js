function initListeners({ changeUsername, changePassword, deleteAccount }) {
    document.getElementById("changeUsernameButton")?.addEventListener("click", changeUsername);
    document.getElementById("changePasswordButton")?.addEventListener("click", changePassword);
    document.getElementById("deleteAccountButton")?.addEventListener("click", deleteAccount);
}

export const profileListeners = {
    initListeners
};