import { z } from "zod";
import { roleSchema, modeSchema } from "../common/match.enums";

export const getMatchesQuerySchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    groupId: z.coerce.number().optional()
});

export const deleteMatchParamsSchema = z.object({
    id: z.coerce.number().positive()
});