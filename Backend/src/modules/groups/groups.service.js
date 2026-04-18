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
        const err = new Error("User already in a group for this mode");
        err.status = 400;
        throw err;
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

const inviteUser = async (fromUser, toUser, groupId, mode) => {
    const userExists = await prisma.user.findUnique({
        where: { username: toUser }
    });

    if (!userExists) {
        const err = new Error("User does not exist");
        err.status = 404;
        throw err;
    }

    if (fromUser === toUser) {
        const err = new Error("You cannot invite yourself");
        err.status = 400;
        throw err;
    }

    if (!mode) {
        const err = new Error("Mode is required");
        err.status = 400;
        throw err;
    }

    let group;
    if (groupId) {
        group = await prisma.streakGroup.findUnique({
            where: { id: groupId }
        });

        if (!group) {
            const err = new Error("Group not found");
            err.status = 404;
            throw err;
        }
    } else {
        const existingMembership = await prisma.groupMember.findUnique({
            where: {
                username_mode: {
                    username: fromUser,
                    mode
                }
            },
            include: {
                StreakGroup: true
            }
        });

        if (existingMembership) {
            group = existingMembership.StreakGroup;
        } else {
            group = await createGroup(fromUser, mode);
        }
    }

    const existingMember = await prisma.groupMember.findUnique({
        where: {
            username_mode: {
                username: toUser,
                mode: group.mode
            }
        }
    });

    if (existingMember) {
        const err = new Error("User already in a group");
        err.status = 400;
        throw err;
    }

    const existingInvite = await prisma.groupInvite.findFirst({
        where: {
            toUser,
            groupId: group.id,
            status: "pending"
        }
    });

    if (existingInvite) {
        const err = new Error("Invite already sent");
        err.status = 400;
        throw err;
    }

    return prisma.groupInvite.create({
        data: {
            fromUser,
            toUser,
            groupId: group.id
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

const getMyGroup = async (username, mode) => {
    if (!mode) {
        const err = new Error("Mode is required");
        err.status = 400;
        throw err;
    }

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
        return null;
    }
    return membership.StreakGroup;
};

const acceptInvite = async (username, inviteId) => {
    const invite = await prisma.groupInvite.findUnique({
        where: { id: inviteId },
        include: { group: true }
    });

    if (!invite || invite.toUser !== username) {
        const err = new Error("Invalid invite");
        err.status = 400;
        throw err;
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
        const err = new Error("Already in a group for this mode");
        err.status = 400;
        throw err;
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

const getGroupMembers = async (groupId) => {
    return prisma.groupMember.findMany({
        where: { groupId },
        select: {
            username: true
        }
    });
};

const removeMember = async (owner, groupId, targetUser) => {
    const group = await prisma.streakGroup.findUnique({
        where: { id: groupId }
    });

    if (!group) {
        const err = new Error("Group not found");
        err.status = 404;
        throw err;
    }

    if (group.owner !== owner) {
        const err = new Error("Only owner can remove members");
        err.status = 403;
        throw err;
    }

    if (targetUser === owner) {
        const err = new Error("Owner cannot remove themselves");
        err.status = 400;
        throw err;
    }

    await prisma.groupMember.delete({
        where: {
            username_mode: {
                username: targetUser,
                mode: group.mode
            }
        }
    });
    return { success: true };
};

const leaveGroup = async (username, groupId) => {
    const group = await prisma.streakGroup.findUnique({
        where: { id: groupId }
    });

    if (!group) {
        const err = new Error("Group not found");
        err.status = 404;
        throw err;
    }

    if (group.owner === username) {
        const err = new Error("Owner cannot leave the group");
        err.status = 403;
        throw err;
    }

    await prisma.groupMember.delete({
        where: {
            username_mode: {
                username,
                mode: group.mode
            }
        }
    });
    return { success: true };
};

module.exports = {
    createGroup,
    inviteUser,
    getMyInvites,
    getMyGroup,
    acceptInvite,
    getGroupMembers,
    removeMember,
    leaveGroup
};