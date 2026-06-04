import { z } from "zod";

export const leaveGroupSchema = z.object({
    groupId: z.number().int().positive()
}).strict();