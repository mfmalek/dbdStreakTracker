import { Request, Response } from "express";
import * as matchesService from "./matches.service";

interface GetMatchesQuery {
    mode: string;
    role: string;
    killerName?: string;
    groupId?: number;
}

interface DeleteMatchParams {
    id: number;
}

export const getMatches = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const { mode, role, killerName, groupId } = req.validatedQuery as GetMatchesQuery;
    const matches = await matchesService.getMatches(user, mode, role, killerName, groupId);

    res.json(matches);
};

export const createMatch = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;

    const { mode, role, killerName, groupId, ...matchData } = {
        ...(req.body as Record<string, unknown>),
        ...(req.validatedPayload as Record<string, unknown>)
    };

    const newMatch = await matchesService.createMatch({
        user,
        mode: mode as string,
        role: role as string,
        killerName: killerName as string | undefined,
        groupId: groupId as number | undefined,
        ...matchData
    });

    res.json(newMatch);
};

export const updateMatch = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const { id } = req.params;
    const updatedMatch = await matchesService.updateMatch(Number(id), user, req.body);

    res.json(updatedMatch);
};

export const deleteMatch = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;
    const { id } = req.validatedParams as DeleteMatchParams;

    await matchesService.deleteMatch(id, username);

    res.json({ message: "Deleted" });
};

export const clearMatches = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const { mode, role, killerName, groupId } = req.validatedQuery as GetMatchesQuery;

    await matchesService.clearMatches(user, mode, role, killerName, groupId);

    res.json({ message: "Cleared" });
};