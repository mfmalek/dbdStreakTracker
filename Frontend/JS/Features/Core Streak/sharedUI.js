function renderNavbar({ username, mode }) {
    const userText = document.getElementById("welcomeUserNav");
    const modeText = document.getElementById("modeIndicator");

    if (userText) {
        userText.textContent = username;
    }

    if (modeText) {
        modeText.innerHTML = `Mode: <span id="modeType">${mode.toUpperCase()}</span>`;
    }
}

function renderStats({ current, best }) {
    const ongoingStreak = document.getElementById("currentStreak");
    const streakRecord = document.getElementById("bestStreak");
    if (!ongoingStreak || !streakRecord) return;
    ongoingStreak.textContent = current;
    streakRecord.textContent = best;
}

export const sharedUI = {
    renderNavbar,
    renderStats
};