function createMatchNumberCell(displayNumber) {
    return `
        <td class="matchNumberCell">
            <span class="matchNumber">${displayNumber}</span>
        </td>
    `;
}

function createMatchActionsCell(matchId) {
    return `
        <td class="matchActionsCell">
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
        </td>
    `;
}

export const sharedTableUI = {
    createMatchNumberCell,
    createMatchActionsCell
};