import { z } from "zod";
import { roleSchema, modeSchema } from "../common/match.enums";

export const resetStreakSchema = z.object({
    mode: modeSchema,
    role: roleSchema,

    killerName: z.string().optional(),
    groupId: z.number().int().positive().nullish()
}).strict();