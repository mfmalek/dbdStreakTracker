const prisma = require('../../config/prisma');
const { updateBestStreak } = require("../streak/streak.service");
const BadRequestError = require("../../errors/bad.request.error");
const UnauthorizedError = require("../../errors/unauthorized.error");
const ForbiddenError = require("../../errors/forbidden.error");
const NotFoundError = require("../../errors/not.found.error");

function getSafeKiller(role, killerName) {
    return role === "killer" ? killerName : "__survivor__";
}

function buildWhere(user, mode, groupId, role, killerName) {
    const safeKiller = getSafeKiller(role, killerName);

    if (role === "killer" && !killerName) {
        throw new BadRequestError(`"killerName" is required for killer match`);
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

const getMatches = async (user, mode, role, killerName, groupId) => {
    if (role === "killer" && !killerName) {
        throw new BadRequestError(`"killerName" is required for getting match`);
    }

    if (!role) {
        throw new BadRequestError(`"role" is required for getting match`);
    }

    return await prisma.match.findMany({
        where: buildWhere(user, mode, groupId, role, killerName),
        orderBy: { createdAt: "asc" }
    });
};

const createMatch = async (data) => {
    const {
        user,
        mode,
        role,
        killerName: contextKillerName,
        groupId,
        ...matchData
    } = data;

    if (role === "survivor") {
        matchData.killerName = data.killerName;
    }

    const safeKiller = getSafeKiller(role, contextKillerName);

    if (!role) {
        throw new BadRequestError(`"role" is required for creating match`);
    }

    if (role === "killer" && !contextKillerName) {
        throw new BadRequestError(`"killerName" is required for creating killer match`);
    }

    const result = calculateResult(matchData, mode, role);
    const newMatch = await prisma.match.create({
        data: {
            user: groupId ? null : user,
            groupId: groupId || null,
            createdBy: user,
            mode,
            role,
            killerName: safeKiller,
            result,
            data: matchData
        }
    });

    if (result === "win") {
        const matches = await prisma.match.findMany({
            where: buildWhere(
                user,
                mode,
                groupId,
                role,
                contextKillerName
            ),
            orderBy: { id: "asc" }
        });

        const currentStreak = calculateCurrentStreak(
            matches.map(m => ({ result: m.result }))
        );

        await updateBestStreak(
            user,
            mode,
            role,
            contextKillerName,
            currentStreak,
            groupId
        );
    }
    return newMatch;
};

const updateMatch = async (id, user, matchData) => {
    const existingMatch = await prisma.match.findUnique({
        where: { id: Number(id) }
    });

    if (!existingMatch) {
        throw new NotFoundError("Match not found while updating match");
    }

    if (!existingMatch.groupId) {
        if (existingMatch.user !== user) {
            throw new UnauthorizedError("Unauthorized attempt of updating match");
        }
    }

    if (existingMatch.groupId) {
        const member = await prisma.groupMember.findFirst({
            where: {
                groupId: existingMatch.groupId,
                username: user
            }
        });

        if (!member) {
            throw new ForbiddenError("Not part of group to update match");
        }
    }

    const result = calculateResult(
        matchData,
        existingMatch.mode,
        existingMatch.role
    );

    const updatedMatch = await prisma.match.update({
        where: { id: Number(id) },
        data: {
            result,
            data: matchData
        }
    });

    const matches = await prisma.match.findMany({
        where: buildWhere(
            user,
            existingMatch.mode,
            existingMatch.groupId,
            existingMatch.role,
            existingMatch.killerName
        ),
        orderBy: { createdAt: "asc" }
    });

    const bestStreak = calculateBestStreak(matches);

    await prisma.streak.upsert({
        where: existingMatch.groupId
            ? {
                groupId_mode_role_killerName: {
                    groupId: existingMatch.groupId,
                    mode: existingMatch.mode,
                    role: existingMatch.role,
                    killerName: existingMatch.killerName
                }
            }
            : {
                user_mode_role_killerName: {
                    user,
                    mode: existingMatch.mode,
                    role: existingMatch.role,
                    killerName: existingMatch.killerName
                }
            },

        update: {
            best: bestStreak
        },

        create: {
            user: existingMatch.groupId ? null : user,
            groupId: existingMatch.groupId || null,
            mode: existingMatch.mode,
            role: existingMatch.role,
            killerName: existingMatch.killerName,
            best: bestStreak
        }
    });

    return updatedMatch;
};

const deleteMatch = async (id, user) => {
    const match = await prisma.match.findUnique({
        where: { id: Number(id) }
    });

    if (!match) {
        throw new NotFoundError("Match not found while deleting match");
    }

    if (!match.groupId) {
        if (match.user !== user) {
            throw new UnauthorizedError("Unauthorized attempt of deleting match");
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
            throw new ForbiddenError("Not part of group to delete match");
        }
    }

    await prisma.match.delete({
        where: { id: Number(id) }
    });

    const { mode, groupId, role, killerName } = match;
    const safeKiller = getSafeKiller(role, killerName);
    const matches = await prisma.match.findMany({
        where: buildWhere(user, mode, groupId, role, killerName),
        orderBy: { createdAt: "asc" }
    });
    const bestStreak = calculateBestStreak(matches);

    await prisma.streak.upsert({
        where: groupId
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
            },
        update: { best: bestStreak },
        create: {
            user: groupId ? null : user,
            groupId: groupId || null,
            mode,
            role,
            killerName: safeKiller,
            best: bestStreak
        }
    });
    return match;
};

const clearMatches = async (user, mode, role, killerName, groupId) => {
    return await prisma.match.deleteMany({
        where: buildWhere(user, mode, groupId, role, killerName)
    });
};

function calculateKillerResult(matchData) {
    const kills = matchData.kills || 0;
    return kills >= 3 ? "win" : "loss";
}

function calculateSurvivorResult(matchData, mode) {
    const survivors = matchData.survivors || [];
    const escapedCount = survivors.filter(s => s.survived).length;

    switch (mode) {
        case "solo": return escapedCount === 1 ? "win" : "loss";
        case "duo": return escapedCount >= 1 ? "win" : "loss";
        case "trio": return escapedCount >= 2 ? "win" : "loss";
        case "squad": return escapedCount >= 3 ? "win" : "loss";
        default: return "loss";
    }
}

function calculateResult(matchData, mode, role) {
    if (role === "killer") {
        return calculateKillerResult(matchData);
    }
    return calculateSurvivorResult(matchData, mode);
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
    updateMatch,
    deleteMatch,
    clearMatches,
    calculateResult
};