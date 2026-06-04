import { z } from "zod";

export const authSchema = z.object({
    username: z.string().trim().min(3).max(30),
    password: z.string().min(6).max(50)
}).strict();