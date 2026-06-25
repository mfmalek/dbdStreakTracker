import { auth } from "../auth/auth.js";

import { streakContext } from "../core/utils/streak.context.js";

import { matchesApi } from "../api/matches.js";
import { groupsApi } from "../api/groups.js";

import { sharedCore } from "../core/streak/shared.core.js";
import { killerCore } from "../core/streak/killer.core.js";

import { initSurvivorStreak } from "../features/survivor-streak/index.js";
import { initKillerStreak } from "../features/killer-streak/index.js";
import { streakShared } from "../features/streak-page-modules/streak.shared.js";
import { streakConfigs } from "../features/survivor-streak/index.js";

import { survivorController } from "../features/survivor-streak/index.js";
import { killerController } from "../features/killer-streak/index.js";
import { matchFormController } from "../features/match-form/index.js";
import { matchDeletion } from "../features/match-form/index.js";

import { navbar } from "../layout/navbar.js";

async function initStreak() {
    const loading = document.getElementById("loadingScreen");

    loading.style.display = "flex";

    try {
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
        sharedCore.setupPerkImagesOnChange();
        killerCore.initKillerSharedUI();

        if (role === "survivor") {
            await initSurvivorStreak.initStreak({
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

            await initKillerStreak.initStreak({
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

    } catch (err) {
        handleFatalPageError(err);
    } finally {
        loading.style.display = "none";
    }
}

function handleFatalPageError(err) {
    console.error(err);

    alert("The page failed to load. Please try again. If the error persists it may be a temporary server issue.");

    window.location.href = "/home";
}

export const streak = {
    initStreak
}