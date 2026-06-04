import { z } from "zod";
import { roleSchema, modeSchema } from "../common/match.enums";

export const createPresetSchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    survivor: z.number().int().min(0).max(3).optional(),
    name: z.string().min(1).max(30),
    perks: z.array(z.string()).max(4)
}).strict();