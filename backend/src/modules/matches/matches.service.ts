import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";

import { updateBestStreak } from "../streak/streak.service";

import BadRequestError from "../../errors/bad.request.error";
import ForbiddenError from "../../errors/forbidden.error";
import NotFoundError from "../../errors/not.found.error";
import UnauthorizedError from "../../errors/unauthorized.error";

type MatchResult = "win" | "loss";

interface SurvivorData {
    survived: boolean;
}

interface MatchData {
    kills?: number;
    survivors?: SurvivorData[];
    killerName?: string;
    [key: string]: unknown;
}

interface CreateMatchInput {
    user: string;
    mode: string;
    role: string;
    killerName?: string;
    groupId?: number;
    [key: string]: unknown;
}

function getSafeKiller(role: string, killerName?: string): string {
    return role === "killer" ? killerName! : "__survivor__";
}

function buildWhere(user: string, mode: string, groupId: number | undefined, role: string, killerName?: string) {
    const safeKiller = getSafeKiller(role, killerName);

    if (role === "killer" && !killerName) {
        throw new BadRequestError(`"killerName" is required for killer match`);
    }

    return {
        mode,
        role,
        killerName: safeKiller,
        ...(groupId ? { groupId: Number(groupId) } : { user })
    };
}

export const getMatches = async (user: string, mode: string, role: string, killerName?: string, groupId?: number) => {
    return prisma.match.findMany({
        where: buildWhere(
            user,
            mode,
            groupId,
            role,
            killerName
        ),
        orderBy: { createdAt: "asc" }
    });
};

export const createMatch = async (data: CreateMatchInput) => {
    const {
        user,
        mode,
        role,
        killerName: contextKillerName,
        groupId,
        ...matchData
    } = data;

    if (role === "survivor") {
        (matchData as MatchData).killerName = contextKillerName;
    }

    const safeKiller = getSafeKiller(role, contextKillerName);
    const result = calculateResult(matchData as MatchData, mode, role);

    const newMatch = await prisma.match.create({
        data: {
            user: groupId ? null : user,
            groupId: groupId ?? null,
            createdBy: user,
            mode,
            role,
            killerName: safeKiller,
            result,
            data: matchData as Prisma.InputJsonValue
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

export const updateMatch = async (id: string | number, user: string, matchData: MatchData) => {
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
            data: matchData as Prisma.InputJsonValue
        }
    });

    const matches = await prisma.match.findMany({
        where: buildWhere(
            user,
            existingMatch.mode,
            existingMatch.groupId ?? undefined,
            existingMatch.role,
            existingMatch.killerName ?? undefined
        ),
        orderBy: { createdAt: "asc" }
    });

    const bestStreak = calculateBestStreak(matches);
    const safeKiller = getSafeKiller(existingMatch.role, existingMatch.killerName ?? undefined);

    await prisma.streak.upsert({
        where: existingMatch.groupId
            ? {
                groupId_mode_role_killerName: {
                    groupId: existingMatch.groupId,
                    mode: existingMatch.mode,
                    role: existingMatch.role,
                    killerName: existingMatch.killerName ?? safeKiller
                }
            }
            : {
                user_mode_role_killerName: {
                    user,
                    mode: existingMatch.mode,
                    role: existingMatch.role,
                    killerName: existingMatch.killerName ?? safeKiller
                }
            },
        update: {
            best: bestStreak
        },
        create: {
            user: existingMatch.groupId ? null : user,
            groupId: existingMatch.groupId ?? null,
            mode: existingMatch.mode,
            role: existingMatch.role,
            killerName: existingMatch.killerName,
            best: bestStreak
        }
    });

    return updatedMatch;
};

export const deleteMatch = async (id: string | number, user: string) => {
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
    const safeKiller = getSafeKiller(role, killerName ?? undefined);

    const matches = await prisma.match.findMany({
        where: buildWhere(
            user,
            mode,
            groupId ?? undefined,
            role,
            killerName ?? undefined
        ),
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
            groupId: groupId ?? null,
            mode,
            role,
            killerName: safeKiller,
            best: bestStreak
        }
    });

    return match;
};

export const clearMatches = async (user: string, mode: string, role: string, killerName?: string, groupId?: number) => {
    return prisma.match.deleteMany({
        where: buildWhere(
            user,
            mode,
            groupId,
            role,
            killerName
        )
    });
};

function calculateKillerResult(matchData: MatchData): MatchResult {
    const kills = Number(matchData.kills ?? 0);
    return kills >= 3 ? "win" : "loss";
}

function calculateSurvivorResult(matchData: MatchData, mode: string): MatchResult {
    const survivors = matchData.survivors ?? [];
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

export function calculateResult(matchData: MatchData, mode: string, role: string): MatchResult {
    if (role === "killer") {
        return calculateKillerResult(matchData);
    }

    return calculateSurvivorResult(matchData, mode);
}

function calculateCurrentStreak(matches: { result: string }[]): number {
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

function calculateBestStreak(matches: { result: string }[]): number {
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