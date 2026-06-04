import { z } from "zod";

export const getGroupMembersSchema = z.object({
    groupId: z.coerce.number().int().positive()
});