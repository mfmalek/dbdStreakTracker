import { auth } from "../Auth/auth.js";
import { sharedCore } from "../Core/Streak/sharedCore.js";
import { survivorCore } from "../Core/Streak/survivorCore.js";
import { killerCore } from "../Core/Streak/killerCore.js";
import { streakContext } from "../Core/Utils/streakContext.js";
import { matchesApi } from "../API/matches.api.js";
import { groupsApi } from "../API/groups.api.js";
import { streakPresets } from "../Features/Survivor Streak/streakPresets.js";
import { survivorUI } from "../Features/Survivor Streak/survivorUI.js";
import { killerUI } from "../Features/Killer Streak/killerUI.js";
import { sharedUI } from "../Features/Core Streak/sharedUI.js";
import { survivorListeners } from "../Features/Survivor Streak/survivorListeners.js";
import { killerListeners } from "../Features/Killer Streak/killerListeners.js";
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
    setupNavbar();
    syncKillerFromUrl();
    const { role } = streakContext.getContext();
    const mode = sharedCore.MODE;
    let group = null;

    try {
        group = await groupsApi.getMyGroup(mode);
    } catch (err) {
        console.error("GROUP FETCH ERROR:", err);
    }

    window.currentGroupId = group?.id || null;
    const [matches] = await Promise.all([
        matchesApi.getMatches()
    ]);

    sharedCore.setupMaps();
    sharedCore.setupMapImageOnChange();
    killerCore.initKillerSharedUI();

    if (role === "survivor") {
        survivorUI.initUI();
        await survivorController.handleRenderTitle();
        await survivorController.handleRenderInvites();
        await survivorController.handleRenderGroupMembers(group);
        await survivorController.handleRenderSurvivors();
        await survivorController.handleRenderTableHeader();
        survivorUI.renderTable(matches || []);
        await survivorController.handleRenderStats();
        survivorCore.initSurvivorCore();
        streakPresets.initPresets();
        survivorListeners.initListeners({
            ui: survivorUI,
            saveConfigs,
            submitMatch,
            deleteTableMatch,
            clearTableMatches,
            resetBestStreak: survivorController.handleResetBestStreak,
            inviteUser: groupsApi.inviteUser,
            acceptInvite: groupsApi.acceptInvite,
            removeMember: groupsApi.removeMember,
            leaveGroup: groupsApi.leaveGroup
        });
    } else if (role === "killer") {
        const { killerName } = streakContext.getContext();

        await killerUI.initUI(group);
        killerUI.renderTable(matches || []);
        await killerController.handleRenderStats();
        killerCore.initKillerOnlyUI();

        if (killerName) {
            killerUI.applyKillerToUI(killerName);
            killerCore.updateKillerAddons(killerName);
        }

        killerListeners.initListeners({
            submitMatch: submitKillerMatch,
            deleteTableMatch,
            clearTableMatches: killerController.handleClearMatches,
            resetBestStreak: killerController.handleResetBestStreak
        });
    }
    loading.style.display = "none";
}

function setupNavbar() {
    const homeBtn = document.getElementById("homeButton");
    const logoutBtn = document.getElementById("logoutButton");

    homeBtn?.addEventListener("click", () => {
        window.location.href = "/home";
    });

    logoutBtn?.addEventListener("click", () => {
        auth.logout();
    });

    const user = auth.getUserFromToken();
    const mode = sharedCore.MODE;

    sharedUI.renderNavbar({
        username: user?.username || "Unknown",
        mode
    });
}

function syncKillerFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const killer = params.get("killer");

    if (!killer) return;

    try {
        const current = streakContext.getContext();

        if (current.role === "killer") {
            streakContext.setContext({
                role: "killer",
                killerName: killer
            });
        }
    } catch {
        streakContext.setContext({
            role: "killer",
            killerName: killer
        });
    }
}

async function saveConfigs() {
    const configs = [];

    for (let i = 1; i <= survivorCore.SURVIVOR_COUNT; i++) {
        configs.push({
            name: document.getElementById(`nicknameSurv${i}`)?.textContent || `Surv${i}`,
            image: document.getElementById(`imageSurv${i}`)?.src.split("/").pop()
        });
    }
    await survivorController.handleSaveConfigs(configs);
}

function getSurvivors() {
    const survivors = [];

    for (let s = 1; s <= survivorCore.SURVIVOR_COUNT; s++) {
        const perks = [];

        for (let p = 1; p <= 4; p++) {
            const select = document.getElementById(`perk${p}Surv${s}`);

            perks.push(select?.value || "");
        }

        survivors.push({
            name: `Surv${s}`,
            perks,
            survived: document.getElementById(`surv${s}Survived`)?.checked || false
        });
    }
    return survivors;
}

async function submitMatch() {
    const { role } = streakContext.getContext();

    if (role === "survivor") {
        return submitSurvivorMatch();
    }

    if (role === "killer") {
        return submitKillerMatch();
    }
}

async function submitSurvivorMatch() {
    const survivors = getSurvivors();
    const mapName = document.getElementById("mapName").value;
    const killerName = document.getElementById("killerName").value;
    const killerPerks = [];
    for (let p = 1; p <= 4; p++) {
        killerPerks.push(document.getElementById(`killerPerk${p}`).value);
    }

    if (!validateMatchInputs(mapName, killerName)) return;

    const match = {
        survivors,
        mapName,
        killerName,
        killerPerks
    };

    await survivorController.handleSubmitMatch(match);
    resetForm();
}

async function submitKillerMatch() {
    const { killerName } = streakContext.getContext();
    const mapName = document.getElementById("mapName").value;
    const kills = Number(document.getElementById("kills")?.value || 0);
    const killsInput = document.getElementById("kills");

    const killerPerks = [];
    for (let p = 1; p <= 4; p++) {
        killerPerks.push(document.getElementById(`killerPerk${p}`).value);
    }

    const killerAddons = [];
    for (let a = 1; a <= 2; a++) {
        killerAddons.push(document.getElementById(`killerAddon${a}`)?.value || "");
    }

    if (!validateKillerMatchInputs(mapName, killerName)) return;

    const match = {
        mapName,
        killerPerks,
        killerAddons,
        kills
    };

    await killerController.handleSubmitMatch(match);
    if (killsInput) killsInput.value = "";
    resetForm();

    if (killerName) {
        const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");
        document.getElementById("killerImage").src = `../Images/Portraits/Killers/Portrait_${clean}.png`;
    } else {
        document.getElementById("killerImage").src = "../Images/Miscellaneous/Icon_Killer.png";
    }
}

function validateMatchInputs(mapName, killerName) {
    if (!killerName) {
        alert("Please select a killer.");
        return false;
    }
    if (!mapName) {
        alert("Please select a map.");
        return false;
    }
    return true;
}

function validateKillerMatchInputs(mapName, killerName) {
    if (!killerName) {
        alert("Killer not defined.");
        return false;
    }

    if (!mapName) {
        alert("Please select a map.");
        return false;
    }

    return true;
}

async function deleteTableMatch() {
    const input = document.getElementById("deleteMatchNumber");
    const index = parseInt(input?.value) - 1;
    const matches = await matchesApi.getMatches();
    const { role } = streakContext.getContext();

    if (isNaN(index)) {
        alert("Please enter a valid match number.");
        return;
    }

    if (index < 0 || index >= matches.length) {
        alert(`Match #${index + 1} does not exist. You currently have ${matches.length} matches.`);
        return;
    }

    const match = matches[index];
    const ui = role === "killer" ? killerUI : survivorUI;
    const controller = role === "killer" ? killerController : survivorController;
    const preview = await controller.handleCreateMatchPreview(match);

    const confirmDelete = confirm(
        `Are you sure you want to delete match #${index + 1}?\n\n${preview}`
    );

    if (!confirmDelete) return;

    await controller.handleDeleteMatch(match.id);
    input.value = "";
}

async function clearTableMatches() {
    const confirmClear = confirm("Are you sure you want to clear ALL matches?");
    if (!confirmClear) return;

    const { role } = streakContext.getContext();

    if (role === "survivor") {
        await survivorController.handleClearMatches();
    } else {
        await killerController.handleClearMatches();
    }
}

function resetForm() {
    const deleteMatchInput = document.getElementById("deleteMatchNumber");

    document.querySelectorAll('select').forEach(select => {
        if (select.tomselect) {
            select.tomselect.clear();
        } else {
            select.selectedIndex = 0;
        }
    });

    for (let s = 1; s <= survivorCore.SURVIVOR_COUNT; s++) {
        const checkbox = document.getElementById(`surv${s}Survived`);
        if (checkbox) checkbox.checked = false;
    }

    document.getElementById("killerImage").src = "../Images/Miscellaneous/Icon_Killer.png";
    document.getElementById("mapImage").src = "../Images/Maps/Map_GenericMapBackground.png";
    deleteMatchInput.value = "";
}

export const streak = {
    initStreak
}