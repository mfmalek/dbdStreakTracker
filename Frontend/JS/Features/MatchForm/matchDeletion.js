import { streakContext } from "../../Core/Utils/streakContext.js";
import { matchesApi } from "../../API/matches.api.js";
import { killerController } from "../Killer Streak/killerController.js";
import { survivorController } from "../Survivor Streak/survivorController.js";
import { killerUI } from "../UI/KillerUI/killerUI.js";
import { matchControls } from "./Utils/matchControls.js";

async function deleteMatchById() {
    const input = matchControls.getDeleteMatchInput();
    const index = parseInt(input?.value) - 1;

    if (isNaN(index)) {
        alert("Please enter a valid match number.");
        return;
    }

    const matches = await matchesApi.getMatches();

    if (index < 0 || index >= matches.length) {
        alert(
            `Match #${index + 1} does not exist. ` +
            `You currently have ${matches.length} matches.`
        );

        return;
    }

    const match = matches[index];
    const deleted = await confirmAndDeleteMatch(match, index + 1);

    if (deleted) {
        input.value = "";
    }
}

async function deleteMatchOnClick(matchId) {
    const matches = await matchesApi.getMatches();
    const match = matches.find(m => m.id === matchId);

    if (!match) {
        alert("Match not found.");
        return;
    }

    const matchNumber = matches.findIndex(m => m.id === matchId) + 1;

    await confirmAndDeleteMatch(match, matchNumber);
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

async function confirmAndDeleteMatch(match, matchNumber) {
    const { role } = streakContext.getContext();

    const controller =
        role === "killer"
            ? killerController
            : survivorController;

    const preview =
        role === "killer"
            ? killerUI.createMatchPreview(match)
            : await survivorController.handleCreateMatchPreview(match);

    const confirmDelete = confirm(`Are you sure you want to delete match #${matchNumber}?\n\n${preview}`);

    if (!confirmDelete) return false;

    await controller.handleDeleteMatch(match.id);

    return true;
}

export const matchDeletion = {
    deleteMatchById,
    deleteMatchOnClick,
    clearTableMatches
};