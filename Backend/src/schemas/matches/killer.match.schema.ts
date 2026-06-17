import { z } from "zod";

export const killerMatchSchema = z.object({
    killerPerks: z.array(z.string()).max(4),
    killerAddons: z.array(z.string()).max(2),
    kills: z.number().min(0).max(4),

    mapName: z.string()
}).strict();