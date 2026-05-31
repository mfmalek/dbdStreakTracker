const { z } = require("zod");

const removeMemberSchema = z.object({
    groupId: z.number().int().positive(),
    targetUser: z.string().min(1).max(20)
}).strict();

module.exports = {
    removeMemberSchema
};