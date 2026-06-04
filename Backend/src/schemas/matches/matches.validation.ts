import { Request, Response, NextFunction } from "express";
import BadRequestError from "../../errors/bad.request.error";
import { survivorMatchSchema } from "./survivor.match.schema";
import { killerMatchSchema } from "./killer.match.schema";

export const validateMatchByRole = (req: Request, _res: Response, next: NextFunction): void => {
    const { role } = req.body as { role?: string };

    if (role === "killer") {
        const payload = {
            kills: req.body.kills,
            killerPerks: req.body.killerPerks,
            killerAddons: req.body.killerAddons,
            mapName: req.body.mapName
        };

        req.validatedPayload = killerMatchSchema.parse(payload);

        next();
        return;
    }

    if (role === "survivor") {
        const payload = {
            survivors: req.body.survivors,
            killerName: req.body.killerName,
            killerPerks: req.body.killerPerks,
            mapName: req.body.mapName
        };

        req.validatedPayload = survivorMatchSchema.parse(payload);

        next();
        return;
    }

    throw new BadRequestError("Invalid role");
};