import { http } from "./http.client.js";
import { sharedCore } from "../Core/Streak/shared.core.js";

function getMode() {
    return sharedCore.MODE;
}

const inviteUser = (toUser, groupId) =>
    http.post("/groups/invite", {
        toUser,
        groupId,
        mode: getMode()
    });

const getInvites = () => http.get("/groups/invites");

const acceptInvite = (inviteId) =>
    http.post("/groups/accept", { inviteId });

const getMyGroup = (mode) =>
    http.get("/groups/me", { mode });

const getGroupMembers = (groupId) =>
    http.get(`/groups/${groupId}/members`);

const removeMember = (groupId, targetUser) =>
    http.post("/groups/remove", { groupId, targetUser });

const leaveGroup = (groupId) =>
    http.post("/groups/leave", { groupId });

export const groupsApi = {
    inviteUser,
    getInvites,
    acceptInvite,
    getMyGroup,
    getGroupMembers,
    removeMember,
    leaveGroup
};