const prisma = require("../../config/prisma");

const createGroup = async (username, mode) => {
    const existing = await prisma.groupMember.findUnique({
        where: {
            username_mode: {
                username,
                mode
            }
        }
    });

    if (existing) {
        throw new Error("User already in a group for this mode");
    }

    const group = await prisma.streakGroup.create({
        data: {
            mode,
            owner: username,
            GroupMember: {
                create: {
                    username,
                    mode
                }
            }
        },
        include: {
            GroupMember: true
        }
    });

    await prisma.streak.create({
        data: {
            groupId: group.id,
            mode,
            best: 0
        }
    });

    return group;
};

const inviteUser = async (fromUser, toUser, groupId) => {
    if (fromUser === toUser) {
        throw new Error("You cannot invite yourself");
    }

    return prisma.groupInvite.create({
        data: {
            fromUser,
            toUser,
            groupId
        }
    });
};

const getMyInvites = async (username) => {
    return prisma.groupInvite.findMany({
        where: {
            toUser: username,
            status: "pending"
        },
        include: {
            group: true
        }
    });
};

const acceptInvite = async (username, inviteId) => {
    const invite = await prisma.groupInvite.findUnique({
        where: { id: inviteId },
        include: { group: true }
    });

    if (!invite || invite.toUser !== username) {
        throw new Error("Invalid invite");
    }

    const existing = await prisma.groupMember.findUnique({
        where: {
            username_mode: {
                username,
                mode: invite.group.mode
            }
        }
    });

    if (existing) {
        throw new Error("Already in a group for this mode");
    }

    await prisma.groupMember.create({
        data: {
            username,
            groupId: invite.groupId,
            mode: invite.group.mode
        }
    });

    await prisma.groupInvite.update({
        where: { id: inviteId },
        data: { status: "accepted" }
    });

    return { success: true };
};

module.exports = {
    createGroup,
    inviteUser,
    getMyInvites,
    acceptInvite
};