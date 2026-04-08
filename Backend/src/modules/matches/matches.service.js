const prisma = require('../../config/prisma');
const { updateBestStreak } = require("../streak/streak.service");

function buildWhere(user, mode, groupId) {
    return {
        mode,
        ...(groupId
            ? { groupId: Number(groupId) }
            : { user })
    };
}

const getMatches = async (user, mode, groupId) => {
    return await prisma.match.findMany({
        where: buildWhere(user, mode, groupId),
        orderBy: { createdAt: "asc" }
    });
};

const createMatch = async (data) => {
    const { user, mode, groupId, ...matchData } = data;

    const result = calculateResult(matchData, mode);

    const newMatch = await prisma.match.create({
        data: {
            user: groupId ? null : user,
            groupId: groupId || null,
            createdBy: user,
            mode,
            result,
            data: matchData
        }
    });

    if (result === "win") {
        const matches = await prisma.match.findMany({
            where: buildWhere(user, mode, groupId),
            orderBy: { id: "asc" }
        });

        const currentStreak = calculateCurrentStreak(
            matches.map(m => ({ result: m.result }))
        );

        await updateBestStreak(user, mode, currentStreak, data.groupId);
    }
    return newMatch;
};

const deleteMatch = async (id, user) => {
    const match = await prisma.match.findUnique({
        where: { id: Number(id) }
    });

    if (!match) {
        throw new Error("Match not found");
    }

    if (!match.groupId) {
        if (match.user !== user) {
            throw new Error("Unauthorized");
        }
    }

    if (match.groupId) {
        const member = await prisma.groupMember.findFirst({
            where: {
                groupId: match.groupId,
                username: user
            }
        });

        if (!member) {
            throw new Error("Not part of group");
        }
    }

    await prisma.match.delete({
        where: { id: Number(id) }
    });

    const { mode, groupId } = match;

    const matches = await prisma.match.findMany({
        where: buildWhere(user, mode, groupId),
        orderBy: { createdAt: "asc" }
    });

    const bestStreak = calculateBestStreak(matches);

    await prisma.streak.upsert({
        where: groupId
            ? { groupId_mode: { groupId, mode } }
            : { user_mode: { user, mode } },

        update: { best: bestStreak },

        create: {
            user: groupId ? null : user,
            groupId: groupId || null,
            mode,
            best: bestStreak
        }
    });

    return match;
};

const clearMatches = async (user, mode, groupId) => {
    return await prisma.match.deleteMany({
        where: buildWhere(user, mode, groupId)
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