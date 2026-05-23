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
            <th>Result</th>
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
                    <td class="matchNumberCell">
                        <span class="matchNumber">${displayNumber}</span>

                        <div class="matchHoverActions">
                            <button
                                class="editMatchHoverBtn"
                                data-match-id="${match.id}"
                                title="Edit Match">
                                ✏️
                            </button>

                            <button
                                class="deleteMatchHoverBtn"
                                data-match-id="${match.id}"
                                title="Delete Match">
                                🗑️
                            </button>
                        </div>
                    </td>
                    <td>
                        ${match.kills ?? "N/A"}K - 
                        ${match.result === "win" ? "✅" : "☠️"}
                    </td>
                    <td>${match.killerPerks?.join(", ") || "N/A"}</td>
                    <td>${match.killerAddons?.join(", ") || "N/A"}</td>
                    <td>${match.mapName || "Unknown Map"}</td>
                </tr>
            `;
        })
        .join("");
}

function applyKillerToUI(killerName) {
    const image = document.getElementById("killerImage");
    const nameEl = document.querySelector("#killerInfo .nickname");
    const clean = killerName.replace(/[^a-zA-Z0-9]/g, "");

    if (image) {
        image.src = `../Images/Portraits/Killers/Portrait_${clean}.png`;
    }

    if (nameEl) {
        nameEl.textContent = killerName;
    }
}

function createMatchPreview(match) {
    if (!match) return "Match not found.";

    return `
        Kills: ${match.kills ?? "N/A"}
        Perks: ${match.killerPerks?.join(", ") || "N/A"}
        Add-ons: ${match.killerAddons?.join(", ") || "N/A"}
        Map: ${match.mapName || "Unknown"}
    `;
}

export const killerUI = {
    initUI,
    renderTable,
    applyKillerToUI,
    createMatchPreview
};