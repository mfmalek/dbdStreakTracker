import { auth } from "../Modules/auth.js"

function initHome() {
    const user = auth.requireAuth();

    if (!user) return;

    auth.checkLoggedUser();
}

export const home = {
    initHome
}