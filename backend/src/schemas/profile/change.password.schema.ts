import { z } from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6).max(50),
    newPassword: z.string().min(6).max(50)
}).strict();