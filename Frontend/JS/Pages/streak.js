import { auth } from "../Auth/auth.js";
import { sharedCore } from "../Core/Streak/sharedCore.js";
import { killerCore } from "../Core/Streak/killerCore.js";
import { streakContext } from "../Core/Utils/streakContext.js";
import { initSurvivorStreak } from "./Streak Modules/streak.survivor.js";
import { initKillerStreak } from "./Streak Modules/streak.killer.js";
import { streakShared } from "./Streak Modules/streak.shared.js";
import { navbar } from "../Layout/navbar.js";
import { matchesApi } from "../API/matches.api.js";
import { groupsApi } from "../API/groups.api.js";
import { streakConfigs } from "./Streak Modules/streak.configs.js";
import { survivorController } from "../Features/Survivor Streak/survivorController.js";
import { killerController } from "../Features/Killer Streak/killerController.js";
import { matchFormController } from "../Features/MatchForm/matchFormController.js";
import { matchDeletion } from "../Features/MatchForm/matchDeletion.js";

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
    navbar.renderNavbar({ mode: sharedCore.MODE });
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
                submitMatch: matchFormController.submitMatch,
                editMatchById: matchFormController.editMatch,
                cancelEditing: matchFormController.cancelEditing,
                deleteMatchById: matchDeletion.deleteMatchById,
                deleteMatchOnClick: matchDeletion.deleteMatchOnClick,
                clearTableMatches: matchDeletion.clearTableMatches,
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
                submitMatch: matchFormController.submitMatch,
                editMatchById: matchFormController.editMatch,
                cancelEditing: matchFormController.cancelEditing,
                deleteMatchById: matchDeletion.deleteMatchById,
                deleteMatchOnClick: matchDeletion.deleteMatchOnClick,
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