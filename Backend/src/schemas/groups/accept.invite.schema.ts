import { z } from "zod";

export const acceptInviteSchema = z.object({
    inviteId: z.number().int().positive()
}).strict();