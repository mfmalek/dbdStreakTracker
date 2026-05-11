import { auth } from "../Auth/auth.js";
import { sharedCore } from "../Core/Streak/sharedCore.js";
import { killerCore } from "../Core/Streak/killerCore.js";
import { streakContext } from "../Core/Utils/streakContext.js";
import { initSurvivorStreak } from "./Streak Modules/streak.survivor.js";
import { initKillerStreak } from "./Streak Modules/streak.killer.js";
import { streakShared } from "./Streak Modules/streak.shared.js";
import { matchesApi } from "../API/matches.api.js";
import { groupsApi } from "../API/groups.api.js";
import { streakActions } from "./Streak Modules/streak.actions.js";
import { streakConfigs } from "./Streak Modules/streak.configs.js";
import { survivorController } from "../Features/Survivor Streak/survivorController.js";
import { killerController } from "../Features/Killer Streak/killerController.js";

async function initStreak() {
    const loading = document.getElementById("loadingScreen");
    loading.style.display = "flex";
    const user = auth.requireAuth();
    if (!user) return;

    try {
        streakContext.getContext();
    } catch {
        window.location.href = "/home";
        return;
    }

    auth.checkLoggedUser();
    streakShared.setupNavbar();
    streakShared.syncKillerFromUrl();
    const { role } = streakContext.getContext();
    const mode = sharedCore.MODE;
    let group = null;

    try {
        group = await groupsApi.getMyGroup(mode);
    } catch (err) {
        console.error("GROUP FETCH ERROR:", err);
    }

    window.currentGroupId = group?.id || null;
    const matches = await matchesApi.getMatches();

    sharedCore.setupMaps();
    sharedCore.setupMapImageOnChange();
    killerCore.initKillerSharedUI();

    if (role === "survivor") {
        await initSurvivorStreak({
            group,
            matches,
            actions: {
                saveConfigs: streakConfigs.saveConfigs,
                submitMatch: streakActions.submitMatch,
                deleteTableMatch: streakActions.deleteTableMatch,
                clearTableMatches: streakActions.clearTableMatches,
                resetBestStreak: survivorController.handleResetBestStreak
            }
        });
    } else if (role === "killer") {
        const { killerName } = streakContext.getContext();

        await initKillerStreak({
            group,
            matches,
            killerName,
            actions: {
                submitMatch: streakActions.submitMatch,
                deleteTableMatch: streakActions.deleteTableMatch,
                clearTableMatches: killerController.handleClearMatches,
                resetBestStreak: killerController.handleResetBestStreak
            }
        });
    }
    loading.style.display = "none";
}

export const streak = {
    initStreak
}