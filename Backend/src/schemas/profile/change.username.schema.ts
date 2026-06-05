import { z } from "zod";

export const changeUsernameSchema = z.object({
    newUsername: z.string().trim().min(3).max(30)
}).strict();