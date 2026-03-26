import { login } from "./Pages/login.js";
import { home } from "./Pages/home.js";
import { streak } from "./Pages/streak.js";

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;

    switch (page) {
        case "login":
            login.initLogin();
            break;
        case "home":
            home.initHome();
            break;
        case "streak":
            streak.initStreak();
            break;
        default:
            console.warn("Page not found.");
    }
});