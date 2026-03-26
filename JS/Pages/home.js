import { auth } from "../Modules/auth.js"

function initHome() {
    auth.checkLoggedUser();
}

export const home = {
    initHome
}