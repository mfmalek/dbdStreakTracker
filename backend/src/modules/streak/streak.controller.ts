import { Request, Response } from "express";
import * as streakService from "./streak.service";

export const getBestStreak = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const { mode, role, killerName, groupId } = req.validatedQuery as any;
    const bestStreak = await streakService.getBestStreak(user, mode, role, killerName, groupId);

    res.json({ bestStreak });
};

export const resetBestStreak = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const { mode, role, killerName, groupId } = req.validatedBody as any;

    await streakService.resetBestStreak(user, mode, role, killerName, groupId);

    res.json({ success: true });
};