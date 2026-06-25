import { uiElements } from "../dom/ui.elements.js";

function renderStats({ current, best }) {
    const ongoingStreak = uiElements.getCurrentStreak();
    const streakRecord = uiElements.getBestStreak();

    if (!ongoingStreak || !streakRecord) return;

    ongoingStreak.textContent = current;
    streakRecord.textContent = best;
}

export const sharedStatsUI = {
    renderStats
};