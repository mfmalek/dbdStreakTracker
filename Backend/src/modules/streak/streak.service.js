const prisma = require("../../config/prisma");

const getBestStreak = async (user, mode) => {
    const record = await prisma.streak.findUnique({
        where: {
            user_mode: {
                user,
                mode
            }
        }
    });

    return record?.best || 0;
};

const updateBestStreak = async (user, mode, currentStreak) => {
    const existing = await prisma.streak.findUnique({
        where: {
            user_mode: { user, mode }
        }
    });

    const previousBest = existing?.best || 0;
    const newBest = Math.max(previousBest, currentStreak);

    return await prisma.streak.upsert({
        where: {
            user_mode: { user, mode }
        },
        update: {
            best: newBest
        },
        create: {
            user,
            mode,
            best: newBest
        }
    });
};

const resetBestStreak = async (user, mode) => {
    const matches = await prisma.match.findMany({
        where: { user, mode },
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

    return await prisma.streak.upsert({
        where: {
            user_mode: { user, mode }
        },
        update: {
            best: currentStreak
        },
        create: {
            user,
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