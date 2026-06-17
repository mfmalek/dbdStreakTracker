import { z } from "zod";
import { modeSchema } from "../common/match.enums";

export const inviteGroupSchema = z.object({
    mode: modeSchema.exclude(["killer"]),

    groupId: z.number().int().positive().nullable().optional(),
    toUser: z.string().min(1).max(20)
}).strict();