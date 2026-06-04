import { Request, Response } from "express";
import * as service from "./survivors.service";
import type { SurvivorConfigInput } from "./survivors.service";

export const getConfigs = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;

    const { mode } = req.validatedQuery as {
        mode: string;
    };

    const configs = await service.getConfigs(user, mode);

    res.json(configs);
};

export const saveConfigs = async (req: Request, res: Response): Promise<void> => {
    const user = req.user!.username;

    const { mode, configs } = req.validatedBody as {
        mode: string;
        configs: SurvivorConfigInput[];
    };

    await service.saveConfigs(user, mode, configs);

    res.json({ message: "Configs saved" });
};