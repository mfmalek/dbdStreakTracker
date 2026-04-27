import { auth } from "../../Auth/auth.js";
import { sharedCore } from "../../Core/Streak/sharedCore.js";
import { survivorCore } from "../../Core/Streak/survivorCore.js";
import { survivorData } from "../../Core/Data/survivorData.js";
import { survivorsApi } from "../../API/survivors.api.js";
import { groupsApi } from "../../API/groups.api.js";

async function initUI(group) {
    await renderTitle();
    renderRules();
    await renderInvites();
    await renderGroupMembers(group?.id, group);
    await renderSurvivors();
    await renderTableHeader();
}

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

async function getSurvivorNames() {
    const configs = await survivorsApi.getSurvivorConfigs();
    const names = [];

    for (let i = 1; i <= survivorCore.SURVIVOR_COUNT; i++) {
        const config = configs[i - 1];
        names.push(config?.name || `Surv${i}`);
    }
    return names;
}

function formatNamesForTitle(names) {
    if (names.length === 1) return names[0];
    if (names.length === 2) return names.join(" & ");
    return `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;
}

async function renderTitle() {
    const title = document.getElementById("streakTitle");
    if (!title) return;
    const names = await getSurvivorNames();
    const formatted = formatNamesForTitle(names);
    title.textContent = `${formatted} - Escape Streak Tracker`;
}

function getRulesByMode(mode) {
    const generalRules = [
        "Event modes are not allowed.",
        "No perk or item restrictions.",
        "Perks/items cannot be repeated.",
        "Match is ignored if the killer is AFK or disconnects before a chase happens."
    ];

    const modeSpecificRule = {
        solo: "The survivor must escape.",
        duo: "At least one survivor must escape.",
        trio: "At least two survivors must escape.",
        squad: "At least three survivors must escape."
    };

    const extraRule = {
        solo: "Hatch espace does count as a win.",
        duo: "Match ignored if any survivor gives up early.",
        trio: "Match ignored if any survivor gives up early.",
        squad: "Match still counts if the teammate disconnects."
    };

    return [
        modeSpecificRule[mode],
        ...(mode === "solo" ? generalRules.filter((_, i) => i !== 1) : generalRules),
        extraRule[mode]
    ];
}

function renderRules() {
    const ruleset = document.getElementById("ruleset");
    if (!ruleset) return;
    const rules = getRulesByMode(sharedCore.MODE);
    ruleset.innerHTML = rules.map(rule => `<span class="streakRule">• ${rule}</span>`).join("");
}

function createSurvivorColumn(index, config = {}) {
    const name = config.name || `Surv${index}`;
    const image = config.image || "Portrait_MegThomas.png";

    return `
    <div class="column">
        <div class="nickAndChar">
            <h2 class="nickname editable" id="nicknameSurv${index}" data-index="${index}"> ${name} </h2>
            <img class="characterPortrait selectable" id="imageSurv${index}"
                data-index="${index}" src="../Images/Portraits/Survivors/${image}" alt="Survivor">
        </div>
    
        <div class="survivorCardWrapper">
            <div class="card">
                <div class="perkBuilder">
                    <h2 class="perkBuilderTitle">Surv${index}'s build</h2>

                    <div class="perkSlots">${createPerkSlots(index)}</div>
                    ${createPresetControls(index)}
                </div>
            </div>
            ${createPortraitGrid(index)}
        </div>

        <label>
            <input type="checkbox" id="surv${index}Survived">
            Surv${index} Survived
        </label>
    </div>
    `;
}

function createPerkSlots(index) {
    return [1, 2, 3, 4].map(p => `
        <div class="perkSlot">
            <label class="perkNumberText">Perk ${p}:</label>
            <select id="perk${p}Surv${index}"></select>
        </div>
    `).join("");
}

function createPresetControls(index) {
    return `
        <div class="presetControls">
            <input type="text" placeholder="Preset Name" id="presetNameSurv${index}">
            <button class="presetButton" id="savePresetSurv${index}">Save Preset</button>

            <select id="presetListSurv${index}">
                <option value="">Load Preset</option>
            </select>

            <button class="presetButton" id="deletePresetSurv${index}">Delete</button>
        </div>
    `;
}

function createPortraitGrid(index) {
    return `
        <div class="portraitGrid hidden" id="portraitGridSurv${index}">
            ${createPortraitGridOptions()}
        </div>
    `;
}

function createPortraitGridOptions() {
    const survivors = survivorData.names;
    const survivorNames = survivors.map(name =>
        name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "")
    );

    return survivorNames.map(name => `
        <img 
            class="portraitOption"
            data-image="Portrait_${name}.png"
            src="../Images/Portraits/Survivors/Portrait_${name}.png"
        >
    `).join("");
}

function applySelectedPortrait(grid, savedImage) {
    if (!grid || !savedImage) return;
    grid.querySelectorAll(".portraitOption").forEach(opt => {
        opt.classList.toggle("selected", opt.dataset.image === savedImage);
    });
}

async function renderSurvivors() {
    const container = document.getElementById("survivorContainer");
    if (!container) return;
    container.innerHTML = "";

    const configs = await survivorsApi.getSurvivorConfigs();

    for (let i = 1; i <= survivorCore.SURVIVOR_COUNT; i++) {
        const config = configs[i - 1];

        container.insertAdjacentHTML(
            "beforeend",
            createSurvivorColumn(i, config)
        );
        const grid = document.getElementById(`portraitGridSurv${i}`);
        const savedImage = config?.image || "Portrait_MegThomas.png";
        applySelectedPortrait(grid, savedImage);
    }
}

async function renderGroupMembers(groupId, group) {
    groupId = groupId || window.currentGroupId;
    group = group || window.currentGroup;

    const container = document.getElementById("groupMembersContainer");

    if (!container) return;
    container.innerHTML = "";

    if (!groupId) {
        container.innerHTML = "<p>No group</p>";
        return;
    }

    const members = await groupsApi.getGroupMembers(groupId);
    const currentUser = auth.getUserFromToken()?.username;
    const isOwner = group?.owner === currentUser;

    members.forEach(member => {
        const li = document.createElement("li");
        const isSelf = member.username === currentUser;
        const isGroupOwner = member.username === group?.owner;

        li.innerHTML = `
            <span id="groupMemberName">
                ${member.username}
                ${isGroupOwner ? " 👑" : ""}
            </span>

            ${isOwner && !isSelf
                ? `<button data-user="${member.username}" class="removeBtn">Remove</button>`
                : ""
            }

            ${!isOwner && isSelf
                ? `<button class="leaveBtn">Leave</button>`
                : ""
            }
        `;
        container.appendChild(li);
    });
}

async function renderInvites() {
    const container = document.getElementById("invitesContainer");
    if (!container) return;
    container.innerHTML = "";
    const invites = await groupsApi.getInvites();

    invites.forEach(invite => {
        const li = document.createElement("li");
        li.className = "inviteItem";
        li.innerHTML = `
            <span>${invite.fromUser} invited you (${invite.group.mode})</span>
            <button data-id="${invite.id}">Accept</button>
        `;
        container.appendChild(li);
    });

    if (!invites.length) {
        container.innerHTML = "<li>No pending invites</li>";
        return;
    }
}

async function createTableHeader() {
    const names = await getSurvivorNames();
    let html = "<tr><th>#</th>";

    names.forEach(name => {
        html += `
            <th>${name}'s Perks</th>
            <th>${name} Survived</th>
        `;
    });

    html += `
        <th>Map</th>
        <th>Killer</th>
        <th>Killer Perks</th>
    </tr>`;
    return html;
}

async function renderTableHeader() {
    const thead = document.querySelector("#matchTable thead");
    if (!thead) return;
    thead.innerHTML = await createTableHeader();
}

function createTableRow(match, displayNumber) {
    let rowHTML = `<tr><td>${displayNumber}</td>`;

    for (let i = 0; i < survivorCore.SURVIVOR_COUNT; i++) {
        const survivor = match.survivors?.[i];

        rowHTML += `
            <td>${survivor?.perks?.join(", ") || "N/A"}</td>
            <td>${survivor?.survived ? "✅" : "☠️"}</td>
        `;
    }

    rowHTML += `
        <td>${match.mapName || "Unknown Map"}</td>
        <td>${match.killerName || "Unknown Killer"}</td>
        <td>${match.killerPerks?.join(", ") || "N/A"}</td>
    </tr>`;
    return rowHTML;
}

function renderTable(matches) {
    const tableBody = document.getElementById("matchTableBody");
    if (!tableBody) return;
    const total = matches.length;

    tableBody.innerHTML = matches
        .slice()
        .reverse()
        .map((match, index) => {
            const displayNumber = total - index;
            return createTableRow(match, displayNumber);
        })
        .join("");
}

function renderStats({ current, best }) {
    const ongoingStreak = document.getElementById("currentStreak");
    const streakRecord = document.getElementById("bestStreak");
    if (!ongoingStreak || !streakRecord) return;
    ongoingStreak.textContent = current;
    streakRecord.textContent = best;
}

function createMatchPreview(match) {
    if (!match) return "Match not found.";
    const names = getSurvivorNames();
    let preview = ``;

    match.survivors?.forEach((surv, i) => {
        const name = names?.[i] || `Surv${i + 1}`;
        const perks = surv.perks?.join(", ") || "No perks";
        const status = surv.survived ? "[✅]" : "[☠️]";

        preview += `${status} `;
        preview += `${name}: `;
        preview += `  ${perks}\n`;
    });
    preview += `\nKiller: ${match.killerName || "Unknown"}`;
    preview += `\nPerks: ${match.killerPerks?.join(", ") || "N/A"}`;
    preview += `\n\nMap: ${match.mapName || "Unknown"}`;
    return preview;
}

export const streakUI = {
    initUI,
    renderNavbar,
    renderTitle,
    renderInvites,
    renderTableHeader,
    renderTable,
    renderStats,
    createMatchPreview
}