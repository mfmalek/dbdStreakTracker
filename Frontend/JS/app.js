import { login } from "./Pages/login.page.js";
import { register } from "./Pages/register.page.js";
import { home } from "./Pages/home.page.js";
import { killerSelection } from "./Pages/killer.selection.page.js";
import { streak } from "./Pages/streak.page.js";

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
        case "killerSelection":
            killerSelection.initKillerSelection();
            break;
        case "streak":
            await streak.initStreak();
            break;
        default:
            console.warn("Page not found.");
    }
});