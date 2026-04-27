const prisma = require("../../config/prisma");

function getSafeKiller(role, killerName) {
    return role === "killer" ? killerName : "__survivor__";
}

function buildWhere(user, mode, groupId, role, killerName) {
    const safeKiller = getSafeKiller(role, killerName);

    if (role === "killer" && !killerName) {
        throw new Error("killerName is required for killer streaks");
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

const getBestStreak = async (user, mode, role, killerName, groupId) => {
    const safeKiller = getSafeKiller(role, killerName);
    const where = groupId
        ? {
            groupId_mode_role_killerName: {
                groupId: Number(groupId) || null,
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
    return record?.best || 0;
};

const updateBestStreak = async (user, mode, role, killerName, currentStreak, groupId) => {
    const safeKiller = getSafeKiller(role, killerName);
    const where = groupId
        ? {
            groupId_mode_role_killerName: {
                groupId: Number(groupId) || null,
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
    const previousBest = existing?.best || 0;
    const newBest = Math.max(previousBest, currentStreak);

    return await prisma.streak.upsert({
        where,
        update: { best: newBest },
        create: {
            user: groupId ? null : user,
            groupId: Number(groupId) || null,
            mode,
            role,
            killerName: safeKiller,
            best: newBest
        }
    });
};

const resetBestStreak = async (user, mode, role, killerName, groupId) => {
    const safeKiller = getSafeKiller(role, killerName);
    const matches = await prisma.match.findMany({
        where: buildWhere(user, mode, groupId, role, killerName),
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

    return await prisma.streak.upsert({
        where,
        update: { best: currentStreak },
        create: {
            user: groupId ? null : user,
            groupId: groupId ? Number(groupId) : null,
            mode,
            role,
            killerName: safeKiller,
            best: currentStreak
        }
    });
};

module.exports = {
    getBestStreak,
    updateBestStreak,
    resetBestStreak
};