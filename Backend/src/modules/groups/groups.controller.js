const groupsService = require("./groups.service");
const prisma = require("../../config/prisma");

async function createGroup(req, res) {
    const username = req.user.username;
    const { mode } = req.body;
    const group = await groupsService.createGroup(username, mode);
    res.json(group);
}

async function inviteUser(req, res) {
    const fromUser = req.user.username;
    const { toUser, groupId, mode } = req.body;
    const invite = await groupsService.inviteUser(fromUser, toUser, groupId, mode);
    res.json(invite);
}

async function getMyInvites(req, res) {
    const username = req.user.username;
    const invites = await groupsService.getMyInvites(username);
    res.json(invites);
}

async function acceptInvite(req, res) {
    const username = req.user.username;
    const { inviteId } = req.body;
    const result = await groupsService.acceptInvite(username, inviteId);
    res.json(result);
}

async function getMyGroup(req, res) {
    const username = req.user.username;
    const { mode } = req.query;
    const group = await groupsService.getMyGroup(username, mode);
    res.json(group);
}

async function getGroupMembers(req, res) {
    const { groupId } = req.params;
    const members = await groupsService.getGroupMembers(Number(groupId));
    res.json(members);
}

async function removeMember(req, res) {
    const owner = req.user.username;
    const { groupId, targetUser } = req.body;
    const result = await groupsService.removeMember(owner, groupId, targetUser);
    res.json(result);
}

async function leaveGroup(req, res) {
    const username = req.user.username;
    const { groupId } = req.body;
    const result = await groupsService.leaveGroup(username, groupId);
    res.json(result);
}

module.exports = {
    createGroup,
    inviteUser,
    getMyInvites,
    acceptInvite,
    getMyGroup,
    getGroupMembers,
    removeMember,
    leaveGroup
};