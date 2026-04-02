const prisma = require('../../config/prisma');
const { updateBestStreak } = require("../streak/streak.service");

const getMatches = async (user, mode) => {
    return await prisma.match.findMany({
        where: { user, mode },
        orderBy: { createdAt: "asc" }
    });
};

const createMatch = async (data) => {
    const { user, mode, ...matchData } = data;

    const result = calculateResult(matchData, mode);

    const newMatch = await prisma.match.create({
        data: {
            user,
            mode,
            result,
            data: matchData
        }
    });

    if (result === "win") {
        const matches = await prisma.match.findMany({
            where: { user, mode },
            orderBy: { id: "asc" }
        });

        const currentStreak = calculateCurrentStreak(
            matches.map(m => ({ result: m.result }))
        );

        await updateBestStreak(user, mode, currentStreak);
    }
    return newMatch;
};

const deleteMatch = async (id, user) => {
    const match = await prisma.match.findFirst({
        where: {
            id: Number(id),
            user: user
        }
    });

    if (!match) {
        throw new Error("Match not found or not owned by user");
    }

    await prisma.match.delete({
        where: { id: Number(id) }
    });

    const { mode } = match;

    const matches = await prisma.match.findMany({
        where: { user, mode },
        orderBy: { createdAt: "asc" }
    });

    const bestStreak = calculateBestStreak(matches);

    await prisma.streak.upsert({
        where: {
            user_mode: { user, mode }
        },
        update: { best: bestStreak },
        create: { user, mode, best: bestStreak }
    });
    return match;
};

const clearMatches = async (user, mode) => {
    return await prisma.match.deleteMany({
        where: { user, mode }
    });
};

function calculateResult(matchData, mode) {
    const survivors = matchData.survivors || [];

    const escapedCount = survivors.filter(s => s.survived).length;

    switch (mode) {
        case "solo":
            return escapedCount === 1 ? "win" : "loss";
        case "duo":
            return escapedCount >= 1 ? "win" : "loss";
        case "trio":
            return escapedCount >= 2 ? "win" : "loss";
        case "squad":
            return escapedCount >= 3 ? "win" : "loss";
        default:
            return "loss";
    }
}

function calculateCurrentStreak(matches) {
    let streak = 0;

    for (let i = matches.length - 1; i >= 0; i--) {
        if (matches[i].result === "win") {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

function calculateBestStreak(matches) {
    let best = 0;
    let temp = 0;

    for (const match of matches) {
        if (match.result === "win") {
            temp++;
            best = Math.max(best, temp);
        } else {
            temp = 0;
        }
    }

    return best;
}

module.exports = {
    getMatches,
    createMatch,
    deleteMatch,
    clearMatches,
    calculateResult
};