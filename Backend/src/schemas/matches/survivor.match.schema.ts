import { z } from "zod";

export const survivorSchema = z.object({
    name: z.string().min(1).max(20),
    perks: z.array(z.string()).max(4),
    survived: z.boolean()
}).strict();

export const survivorMatchSchema = z.object({
    survivors: z.array(survivorSchema).min(1).max(4),
    killerName: z.string(),
    killerPerks: z.array(z.string()).max(4),
    mapName: z.string()
}).strict();