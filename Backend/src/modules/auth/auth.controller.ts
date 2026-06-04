import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.validatedBody as {
        username: string;
        password: string;
    };

    const user = await authService.register(username, password);

    res.json(user);
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.validatedBody as {
        username: string;
        password: string;
    };

    const result = await authService.login(username, password);

    res.json(result);
};