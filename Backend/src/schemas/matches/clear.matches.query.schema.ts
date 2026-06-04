import { z } from "zod";
import { roleSchema, modeSchema } from "../common/match.enums";

export const clearMatchesQuerySchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    groupId: z.coerce.number().optional()
});