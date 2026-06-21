import prisma from "../../config/prisma";
import bcrypt from "bcrypt";

import BadRequestError from "../../errors/bad.request.error";
import NotFoundError from "../../errors/not.found.error";
import UnauthorizedError from "../../errors/unauthorized.error";

export async function getProfile(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            username: true,
            createdAt: true
        }
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;
}

export async function changeUsername(currentUsername: string, newUsername: string) {
    const existingUser = await prisma.user.findUnique({
        where: { username: newUsername }
    });

    if (existingUser) {
        throw new BadRequestError("Username already taken");
    }

    await prisma.$transaction([
        prisma.user.update({
            where: { username: currentUsername },
            data: { username: newUsername }
        }),

        prisma.survivorConfig.updateMany({
            where: { user: currentUsername },
            data: { user: newUsername }
        }),

        prisma.preset.updateMany({
            where: { user: currentUsername },
            data: { user: newUsername }
        }),

        prisma.match.updateMany({
            where: { user: currentUsername },
            data: { user: newUsername }
        }),

        prisma.match.updateMany({
            where: { createdBy: currentUsername },
            data: { createdBy: newUsername }
        }),

        prisma.streak.updateMany({
            where: { user: currentUsername },
            data: { user: newUsername }
        }),

        prisma.groupMember.updateMany({
            where: { username: currentUsername },
            data: { username: newUsername }
        }),

        prisma.groupInvite.updateMany({
            where: { fromUser: currentUsername },
            data: { fromUser: newUsername }
        }),

        prisma.groupInvite.updateMany({
            where: { toUser: currentUsername },
            data: { toUser: newUsername }
        }),

        prisma.streakGroup.updateMany({
            where: { owner: currentUsername },
            data: { owner: newUsername }
        })
    ]);

    return {
        message: "Username updated successfully. Please login again."
    };
}

export async function changePassword(username: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
        throw new UnauthorizedError("Current password is incorrect");
    }

    if (currentPassword === newPassword) {
        throw new BadRequestError("New password must be different from current password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { username },
        data: { password: hashedPassword }
    });

    return {
        message: "Password updated successfully"
    };
}

export async function deleteAccount(username: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw new UnauthorizedError("Invalid password");
    }

    const ownedGroups = await prisma.streakGroup.findMany({
        where: { owner: username },
        select: { id: true }
    });

    const groupIds = ownedGroups.map(group => group.id);

    await prisma.$transaction(async (tx) => {
        if (groupIds.length > 0) {
            await tx.groupInvite.deleteMany({
                where: {
                    groupId: { in: groupIds }
                }
            });

            await tx.groupMember.deleteMany({
                where: {
                    groupId: { in: groupIds }
                }
            });

            await tx.match.deleteMany({
                where: {
                    groupId: { in: groupIds }
                }
            });

            await tx.streak.deleteMany({
                where: {
                    groupId: { in: groupIds }
                }
            });

            await tx.streakGroup.deleteMany({
                where: {
                    id: { in: groupIds }
                }
            });
        }

        await tx.groupInvite.deleteMany({
            where: {
                OR: [
                    { fromUser: username },
                    { toUser: username }
                ]
            }
        });

        await tx.groupMember.deleteMany({
            where: { username }
        });

        await tx.survivorConfig.deleteMany({
            where: { user: username }
        });

        await tx.preset.deleteMany({
            where: { user: username }
        });

        await tx.match.deleteMany({
            where: {
                OR: [
                    { user: username },
                    { createdBy: username }
                ]
            }
        });

        await tx.streak.deleteMany({
            where: { user: username }
        });

        await tx.user.delete({
            where: { username }
        });
    });

    return {
        message: "Account deleted successfully"
    };
}

function calculateCurrentStreak(matches: { result: string }[]): number {
    let current = 0;

    for (let i = matches.length - 1; i >= 0; i--) {
        if (matches[i].result === "win") {
            current++;
        } else {
            break;
        }
    }

    return current;
}

export async function getStreaks(username: string) {
    const memberships = await prisma.groupMember.findMany({
        where: { username },
        select: { groupId: true }
    });

    const groupIds = memberships.map(m => m.groupId);

    const streaks = await prisma.streak.findMany({
        where: {
            OR: [
                { user: username },
                { groupId: { in: groupIds } }
            ]
        },
        orderBy: [
            { role: "asc" },
            { mode: "asc" }
        ]
    });

    const result = [];

    for (const streak of streaks) {
        const matchWhere = streak.groupId
            ? {
                groupId: streak.groupId,
                mode: streak.mode,
                role: streak.role,
                killerName: streak.killerName
            }
            : {
                user: username,
                mode: streak.mode,
                role: streak.role,
                killerName: streak.killerName
            };

        const matches = await prisma.match.findMany({
            where: matchWhere,
            select: { result: true },
            orderBy: { createdAt: "asc" }
        });

        const current = calculateCurrentStreak(matches);

        if (current > 0 || streak.best > 0) {
            result.push({
                mode: streak.mode,
                role: streak.role,
                killerName: streak.role === "killer" ? streak.killerName : "__survivor__",
                current,
                best: streak.best
            });
        }
    }

    return result;
}