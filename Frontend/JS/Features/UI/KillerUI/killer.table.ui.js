import { uiElements } from "../Utils/ui.elements.js";
import { sharedTableUI } from "../SharedUI/shared.table.ui.js";

function renderTable(matches) {
    renderTableHeader();
    renderTableBody(matches);
}

function renderTableHeader() {
    const thead = document.querySelector("#matchTable thead");

    if (!thead) return;

    let html = `
        <tr>
            <th>#</th>
            <th>Result</th>
            <th>Perks</th>
            <th>Add-ons</th>
            <th>Map</th>
            <th>Actions</th>
        </tr>
    `

    thead.innerHTML = html;
}

function renderTableBody(matches) {
    const tbody = uiElements.getTableBody();

    if (!tbody) return;

    const total = matches.length;

    tbody.innerHTML = matches
        .slice()
        .reverse()
        .map((match, index) => {
            const displayNumber = total - index;

            return `
                <tr>
                    ${sharedTableUI.createMatchNumberCell(displayNumber)}
                    <td>${match.kills ?? "N/A"}K - ${match.result === "win" ? "✅" : "☠️"}</td>
                    <td>${match.killerPerks?.join(", ") || "N/A"}</td>
                    <td>${match.killerAddons?.join(", ") || "N/A"}</td>
                    <td>${match.mapName || "Unknown Map"}</td>
                    <td>${sharedTableUI.createMatchActionsCell(match.id)}</td>
                </tr>
            `;
        })
        .join("");
}

export const killerTableUI = {
    renderTable
}