const { z } = require("zod");

const leaveGroupSchema = z.object({
    groupId: z.number().int().positive()
}).strict();

module.exports = {
    leaveGroupSchema
};