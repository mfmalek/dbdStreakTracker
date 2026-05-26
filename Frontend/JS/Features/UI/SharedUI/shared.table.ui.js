function createMatchNumberCell(matchId, displayNumber) {
    return `
        <td class="matchNumberCell">
            <span class="matchNumber">${displayNumber}</span>

            ${createMatchActions(matchId)}
        </td>
    `;
}

function createMatchActions(matchId) {
    return `
        <div class="matchHoverActions">
            <button
                class="editMatchHoverBtn"
                data-match-id="${matchId}"
                title="Edit Match">
                ✏️
            </button>

            <button
                class="deleteMatchHoverBtn"
                data-match-id="${matchId}"
                title="Delete Match">
                🗑️
            </button>
        </div>
    `;
}

export const sharedTableUI = {
    createMatchNumberCell
};