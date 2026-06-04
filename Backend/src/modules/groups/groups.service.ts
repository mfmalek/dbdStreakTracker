import prisma from "../../config/prisma";
import BadRequestError from "../../errors/bad.request.error";
import ForbiddenError from "../../errors/forbidden.error";
import NotFoundError from "../../errors/not.found.error";

export async function createGroup(username: string, mode: string) {
    const existing = await prisma.groupMember.findUnique({
        where: {
            username_mode: {
                username,
                mode
            }
        }
    });

    if (existing) {
        throw new BadRequestError("User already in a group for this mode");
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

    return group;
}

export async function inviteUser(fromUser: string, toUser: string, groupId: number | null, mode: string) {
    const userExists = await prisma.user.findUnique({
        where: { username: toUser }
    });

    if (!userExists) {
        throw new NotFoundError("User does not exist");
    }

    if (fromUser === toUser) {
        throw new BadRequestError("You cannot invite yourself");
    }

    let group;

    if (groupId) {
        group = await prisma.streakGroup.findUnique({
            where: { id: Number(groupId) }
        });

        if (!group) {
            throw new NotFoundError("Group not found");
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
        throw new BadRequestError("User already in a group");
    }

    const existingInvite = await prisma.groupInvite.findFirst({
        where: {
            toUser,
            groupId: group.id,
            status: "pending"
        }
    });

    if (existingInvite) {
        throw new BadRequestError("Invite already sent");
    }

    return prisma.groupInvite.create({
        data: {
            fromUser,
            toUser,
            groupId: group.id
        }
    });
}

export async function getMyInvites(username: string) {
    return prisma.groupInvite.findMany({
        where: {
            toUser: username,
            status: "pending"
        },
        include: {
            group: true
        }
    });
}

export async function getMyGroup(username: string, mode: string) {
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
}

export async function acceptInvite(username: string, inviteId: number) {
    const invite = await prisma.groupInvite.findUnique({
        where: { id: Number(inviteId) },
        include: { group: true }
    });

    if (!invite || invite.toUser !== username) {
        throw new BadRequestError("Invalid invite");
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
        throw new BadRequestError("Already in a group for this mode");
    }

    await prisma.groupMember.create({
        data: {
            username,
            groupId: invite.groupId,
            mode: invite.group.mode
        }
    });

    await prisma.groupInvite.update({
        where: { id: Number(inviteId) },
        data: { status: "accepted" }
    });

    return { success: true };
}

export async function getGroupMembers(groupId: number) {
    return prisma.groupMember.findMany({
        where: { groupId },
        select: {
            username: true
        }
    });
}

export async function removeMember(owner: string, groupId: number, targetUser: string) {
    const group = await prisma.streakGroup.findUnique({
        where: { id: Number(groupId) }
    });

    if (!group) {
        throw new NotFoundError("Group not found");
    }

    if (group.owner !== owner) {
        throw new ForbiddenError("Only owner can remove member");
    }

    if (targetUser === owner) {
        throw new BadRequestError("Owner cannot remove themself");
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
}

export async function leaveGroup(username: string, groupId: number) {
    const group = await prisma.streakGroup.findUnique({
        where: { id: Number(groupId) }
    });

    if (!group) {
        throw new NotFoundError("Group not found");
    }

    if (group.owner === username) {
        throw new ForbiddenError("Owner cannot leave the group");
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
}