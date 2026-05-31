const { z } = require("zod");
const { modeSchema } = require("../common/match.enums");

const inviteGroupSchema = z.object({
    toUser: z.string().min(1).max(20),
    groupId: z.number().int().positive().optional(),
    mode: modeSchema.exclude(["killer"])
}).strict();

module.exports = {
    inviteGroupSchema
};