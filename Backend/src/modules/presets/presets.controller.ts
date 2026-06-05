import { Request, Response } from "express";
import * as presetsService from "./presets.service";

export const getPresets = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const { mode, role, killerName, survivor } = req.validatedQuery as any;
    const presets = await presetsService.getPresets(user, mode, role, killerName, survivor);

    res.json(presets);
};

export const createPreset = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const { mode, role, killerName, survivor, name, perks, addons } = req.validatedBody as any;

    const preset = await presetsService.createPreset({
        user,
        mode,
        role,
        killerName,
        survivor,
        name,
        perks,
        addons
    });

    res.json(preset);
};

export const deletePreset = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;
    const id = Number(req.params.id);

    await presetsService.deletePreset(id, user);

    res.json({ success: true });
};