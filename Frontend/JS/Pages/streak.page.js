import { auth } from "../Auth/auth.js";
import { sharedCore } from "../Core/Streak/shared.core.js";
import { killerCore } from "../Core/Streak/killer.core.js";
import { streakContext } from "../Core/Utils/streak.context.js";
import { initSurvivorStreak } from "../Features/Streak Page Modules/streak.survivor.js";
import { initKillerStreak } from "../Features/Streak Page Modules/streak.killer.js";
import { streakShared } from "../Features/Streak Page Modules/streak.shared.js";
import { navbar } from "../Layout/navbar.js";
import { matchesApi } from "../API/matches.api.js";
import { groupsApi } from "../API/groups.api.js";
import { streakConfigs } from "../Features/Streak Page Modules/streak.configs.js";
import { survivorController } from "../Features/Survivor Streak/survivor.controller.js";
import { killerController } from "../Features/Killer Streak/killer.controller.js";
import { matchFormController } from "../Features/MatchForm/match.form.controller.js";
import { matchDeletion } from "../Features/MatchForm/match.deletion.js";

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