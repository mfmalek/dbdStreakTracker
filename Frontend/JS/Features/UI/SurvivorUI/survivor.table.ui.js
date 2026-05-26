import { uiElements } from "../Utils/ui.elements.js";
import { sharedTableUI } from "../SharedUI/shared.table.ui.js";
import { survivorCore } from "../../../Core/Streak/survivor.core.js";

function renderTable(names, matches) {
    renderTableHeader(names);
    renderTableBody(matches);
}

function renderTableHeader(names) {
    const thead = document.querySelector("#matchTable thead");
    
    if (!thead) return;

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

    thead.innerHTML = html;
}

function renderTableBody(matches) {
    const tableBody = uiElements.getTableBody();

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

function createTableRow(match, displayNumber) {
    let rowHTML = `
        <tr>
            ${sharedTableUI.createMatchNumberCell(match.id, displayNumber)}
        `;

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

export const survivorTableUI = {
    renderTable,
    renderTableHeader
}