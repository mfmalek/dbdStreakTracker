import { uiElements } from "../../../ui/utils/ui.elements.js";

function renderGroupMembers(members, group, currentUser) {
    const container = uiElements.getGroupMembersContainer();

    if (!container) return;

    container.innerHTML = "";

    if (!members || !members.length) {
        container.innerHTML = "<p>No group</p>";
        return;
    }

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
                ? `<button data-user="${member.username}" class="removeBtn btn-danger">Remove</button>`
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

function renderInvites(invites) {
    const container = uiElements.getInvitesContainer();

    if (!container) return;

    container.innerHTML = "";

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
    }
}

export const survivorGroupUI = {
    renderGroupMembers,
    renderInvites
}