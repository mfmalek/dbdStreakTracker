import { z } from "zod";
import { roleSchema, modeSchema } from "../common/match.enums";

export const getPresetsQuerySchema = z.object({
    mode: modeSchema,
    role: roleSchema,

    killerName: z.string().optional(),
    survivor: z.coerce.number().int().min(0).max(3).optional()
}).strict();