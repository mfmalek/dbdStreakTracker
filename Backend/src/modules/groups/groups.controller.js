const groupsService = require("./groups.service");
const prisma = require("../../config/prisma");

async function createGroup(req, res) {
    try {
        const username = req.user.username;
        const { mode } = req.body;

        const group = await groupsService.createGroup(username, mode);

        res.json(group);
    } catch (error) {
        console.error("CREATE GROUP ERROR:", error);
        res.status(400).json({ error: error.message });
    }
}

async function inviteUser(req, res) {
    try {
        const fromUser = req.user.username;
        const { toUser, groupId, mode } = req.body;

        const invite = await groupsService.inviteUser(fromUser, toUser, groupId, mode);

        res.json(invite);
    } catch (error) {
        console.error("INVITE ERROR:", error);
        res.status(400).json({ error: error.message });
    }
}

async function getMyInvites(req, res) {
    try {
        const username = req.user.username;

        const invites = await groupsService.getMyInvites(username);

        res.json(invites);
    } catch (error) {
        console.error("GET INVITES ERROR:", error);
        res.status(400).json({ error: error.message });
    }
}

async function acceptInvite(req, res) {
    try {
        const username = req.user.username;
        const { inviteId } = req.body;

        const result = await groupsService.acceptInvite(username, inviteId);

        res.json(result);
    } catch (error) {
        console.error("ACCEPT INVITE ERROR:", error);
        res.status(400).json({ error: error.message });
    }
}

async function getMyGroup(req, res) {
    const username = req.user.username;
    const mode = req.query.mode;

    if (!mode) {
        return res.status(400).json({ error: "Mode is required" });
    }

    try {
        const membership = await prisma.groupMember.findFirst({
            where: {
                username,
                mode
            },
            include: {
                StreakGroup: true
            }
        });

        if (!membership) {
            return res.json(null);
        }

        res.json(membership.StreakGroup);
    } catch (err) {
        console.error("GET MY GROUP ERROR:", err);
        res.status(500).json({ 
            error: "Failed to fetch group",
            details: err.message
        });
    }
}

async function getGroupMembers(req, res) {
    try {
        const { groupId } = req.params;
        const members = await groupsService.getGroupMembers(Number(groupId));

        res.json(members);
    } catch (error) {
        console.error("GET MEMBERS ERROR:", error);
        res.status(400).json({ error: error.message });
    }
}

async function removeMember(req, res) {
    try {
        const owner = req.user.username;
        const { groupId, targetUser } = req.body;

        const result = await groupsService.removeMember(owner, groupId, targetUser);

        res.json(result);
    } catch (error) {
        console.error("REMOVE MEMBER ERROR:", error);
        res.status(400).json({ error: error.message });
    }
}

async function leaveGroup(req, res) {
    try {
        const username = req.user.username;
        const { groupId } = req.body;

        const result = await groupsService.leaveGroup(username, groupId);

        res.json(result);
    } catch (error) {
        console.error("LEAVE GROUP ERROR:", error);
        res.status(400).json({ error: error.message });
    }
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