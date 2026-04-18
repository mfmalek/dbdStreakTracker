const prisma = require("../../config/prisma");

const getBestStreak = async (user, mode, groupId) => {
    const where = groupId
        ? { groupId_mode: { groupId: Number(groupId), mode } }
        : { user_mode: { user, mode } };
    const record = await prisma.streak.findUnique({ where });
    return record?.best || 0;
};

const updateBestStreak = async (user, mode, currentStreak, groupId) => {
    const where = groupId
        ? { groupId_mode: { groupId, mode } }
        : { user_mode: { user, mode } };
    const existing = await prisma.streak.findUnique({ where });
    const previousBest = existing?.best || 0;
    const newBest = Math.max(previousBest, currentStreak);

    return await prisma.streak.upsert({
        where,
        update: {
            best: newBest
        },
        create: {
            user: groupId ? null : user,
            groupId: groupId || null,
            mode,
            best: newBest
        }
    });
};

const resetBestStreak = async (user, mode, groupId) => {
    const whereMatches = groupId
        ? { groupId: Number(groupId), mode }
        : { user, mode };
    const matches = await prisma.match.findMany({
        where: whereMatches,
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
        ? { groupId_mode: { groupId: Number(groupId), mode } }
        : { user_mode: { user, mode } };

    return await prisma.streak.upsert({
        where,
        update: {
            best: currentStreak
        },
        create: {
            user: groupId ? null : user,
            groupId: groupId ? Number(groupId) : null,
            mode,
            best: currentStreak
        }
    });
};

module.exports = {
    getBestStreak,
    updateBestStreak,
    resetBestStreak
};