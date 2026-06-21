import prisma from "../../config/prisma";
import BadRequestError from "../../errors/bad.request.error";

function getSafeKiller(role: string, killerName?: string): string {
    return role === "killer" ? killerName! : "__survivor__";
}

function buildWhere(user: string, mode: string, groupId: number | undefined, role: string, killerName?: string) {
    const safeKiller = getSafeKiller(role, killerName);

    if (role === "killer" && !killerName) {
        throw new BadRequestError(`"killerName" is required for killer streak`);
    }

    return {
        mode,
        role,
        killerName: safeKiller,
        ...(groupId
            ? { groupId: Number(groupId) }
            : { user })
    };
}

export const getBestStreak = async (user: string, mode: string, role: string, killerName?: string, groupId?: number) => {
    const safeKiller = getSafeKiller(role, killerName);

    const where = groupId
        ? {
            groupId_mode_role_killerName: {
                groupId: Number(groupId),
                mode,
                role,
                killerName: safeKiller
            }
        }
        : {
            user_mode_role_killerName: {
                user,
                mode,
                role,
                killerName: safeKiller
            }
        };

    const record = await prisma.streak.findUnique({ where });

    return record?.best ?? 0;
};

export const updateBestStreak = async (user: string, mode: string, role: string, killerName: string | undefined, currentStreak: number, groupId?: number) => {
    const safeKiller = getSafeKiller(role, killerName);

    const where = groupId
        ? {
            groupId_mode_role_killerName: {
                groupId: Number(groupId),
                mode,
                role,
                killerName: safeKiller
            }
        }
        : {
            user_mode_role_killerName: {
                user,
                mode,
                role,
                killerName: safeKiller
            }
        };

    const existing = await prisma.streak.findUnique({ where });
    const previousBest = existing?.best ?? 0;
    const newBest = Math.max(previousBest, currentStreak);

    return prisma.streak.upsert({
        where,
        update: { best: newBest },
        create: {
            user: groupId ? null : user,
            groupId: groupId ?? null,
            mode,
            role,
            killerName: safeKiller,
            best: newBest
        }
    });
};

export const resetBestStreak = async (user: string, mode: string, role: string, killerName?: string, groupId?: number) => {
    const safeKiller = getSafeKiller(role, killerName);

    const matches = await prisma.match.findMany({
        where: buildWhere(
            user,
            mode,
            groupId,
            role,
            killerName
        ),
        orderBy: { createdAt: "asc" }
    });

    let currentStreak = 0;

    for (let i = matches.length - 1; i >= 0; i--) {
        if (matches[i].result === "win") {
            currentStreak++;
        } else {
            break;
        }
    }

    const where = groupId
        ? {
            groupId_mode_role_killerName: {
                groupId,
                mode,
                role,
                killerName: safeKiller
            }
        }
        : {
            user_mode_role_killerName: {
                user,
                mode,
                role,
                killerName: safeKiller
            }
        };

    return prisma.streak.upsert({
        where,
        update: { best: currentStreak },
        create: {
            user: groupId ? null : user,
            groupId: groupId ?? null,
            mode,
            role,
            killerName: safeKiller,
            best: currentStreak
        }
    });
};