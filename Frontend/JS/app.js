import { login } from "./Pages/login.js";
import { register } from "./Pages/register.js";
import { home } from "./Pages/home.js";
import { streak } from "./Pages/streak.js";

document.addEventListener("DOMContentLoaded", async () => {
    const page = document.body.dataset.page;

    switch (page) {
        case "login":
            login.initLogin();
            break;
        case "register":
            register.initRegister();
            break;
        case "home":
            home.initHome();
            break;
        case "streak":
            await streak.initStreak();
            break;
        default:
            console.warn("Page not found.");
    }
});