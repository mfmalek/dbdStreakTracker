import { login } from "./pages/login.page.js";
import { register } from "./pages/register.page.js";
import { home } from "./pages/home.page.js";
import { killerSelection } from "./pages/killer.selection.page.js";
import { streak } from "./pages/streak.page.js";
import { profile } from "./pages/profile.page.js";

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
        case "profile":
            await profile.initProfile();
            break;
        default:
            console.warn("Page not found.");
    }
});