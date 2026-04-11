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

const inviteUser = async (fromUser, toUser, groupId, mode) => {
    const userExists = await prisma.user.findUnique({
        where: { username: toUser }
    });

    if (!userExists) {
        throw new Error("User does not exist");
    }

    if (fromUser === toUser) {
        throw new Error("You cannot invite yourself");
    }

    if (!mode) {
        throw new Error("Mode is required");
    }

    let group;

    if (groupId) {
        group = await prisma.streakGroup.findUnique({
            where: { id: groupId }
        });

        if (!group) {
            throw new Error("Group not found");
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
        throw new Error("User already in a group");
    }

    const existingInvite = await prisma.groupInvite.findFirst({
        where: {
            toUser,
            groupId: group.id,
            status: "pending"
        }
    });

    if (existingInvite) {
        throw new Error("Invite already sent");
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

    if (!group) throw new Error("Group not found");

    if (group.owner !== owner) {
        throw new Error("Only owner can remove members");
    }

    if (targetUser === owner) {
        throw new Error("Owner cannot remove themselves");
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

    if (!group) throw new Error("Group not found");

    if (group.owner === username) {
        throw new Error("Owner cannot leave the group");
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
    acceptInvite,
    getGroupMembers,
    removeMember,
    leaveGroup
};