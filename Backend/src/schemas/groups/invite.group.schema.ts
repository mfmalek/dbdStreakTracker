import { z } from "zod";
import { modeSchema } from "../common/match.enums";

export const inviteGroupSchema = z.object({
    toUser: z.string().min(1).max(20),
    groupId: z.number().int().positive().optional(),
    mode: modeSchema.exclude(["killer"])
}).strict();