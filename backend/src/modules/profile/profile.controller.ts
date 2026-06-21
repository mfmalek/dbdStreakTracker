import { Request, Response } from "express";
import * as profileService from "./profile.service";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;
    const profile = await profileService.getProfile(username);

    res.json(profile);
};

export const changeUsername = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;

    const { newUsername } = req.validatedBody as {
        newUsername: string;
    };

    const result = await profileService.changeUsername(username, newUsername);

    res.json(result);
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;

    const { currentPassword, newPassword } = req.validatedBody as {
        currentPassword: string;
        newPassword: string;
    };

    const result = await profileService.changePassword(username, currentPassword, newPassword);

    res.json(result);
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;

    const { password } = req.validatedBody as {
        password: string;
    };

    const result = await profileService.deleteAccount(username, password);

    res.json(result);
};

export const getStreaks = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;
    const streaks = await profileService.getStreaks(username);

    res.json(streaks);
};