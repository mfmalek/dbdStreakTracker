function initUI() {
    renderTitle();
    renderRules();
}

function renderTitle() {
    const title = document.getElementById("streakTitle");
    if (!title) return;

    title.textContent = "Killer Streak Tracker";
}

function renderRules() {
    const ruleset = document.getElementById("ruleset");
    if (!ruleset) return;

    const rules = [
        "Event modes are not allowed.",
        "Dodging a match on purpose instantly counts as a loss.",
        "At least three survivors must be sacrificed.",
        "No restrictions on perks or add-ons.",
        "Match still counts if survivors disconnect."
    ];

    ruleset.innerHTML = rules
        .map(rule => `<span class="streakRule">• ${rule}</span>`)
        .join("");
}

function renderTable(matches) {
    const thead = document.querySelector("#matchTable thead");
    const tbody = document.getElementById("matchTableBody");

    if (!thead || !tbody) return;

    thead.innerHTML = `
        <tr>
            <th>#</th>
            <th>Killer</th>
            <th>Perks</th>
            <th>Add-ons</th>
            <th>Map</th>
        </tr>
    `;

    const total = matches.length;

    tbody.innerHTML = matches
        .slice()
        .reverse()
        .map((match, index) => {
            const displayNumber = total - index;

            return `
                <tr>
                    <td>${displayNumber}</td>
                    <td>${match.killerName || "Unknown"}</td>
                    <td>${match.killerPerks?.join(", ") || "N/A"}</td>
                    <td>${match.killerAddons?.join(", ") || "N/A"}</td>
                    <td>${match.mapName || "Unknown Map"}</td>
                </tr>
            `;
        })
        .join("");
}

function renderStats({ current, best }) {
    const currentEl = document.getElementById("currentStreak");
    const bestEl = document.getElementById("bestStreak");

    if (!currentEl || !bestEl) return;

    currentEl.textContent = current;
    bestEl.textContent = best;
}

export const killerUI = {
    initUI,
    renderTable,
    renderStats
};