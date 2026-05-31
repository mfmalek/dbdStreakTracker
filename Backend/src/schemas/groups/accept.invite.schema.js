const { z } = require("zod");

const acceptInviteSchema = z.object({
    inviteId: z.number().int().positive()
}).strict();

module.exports = {
    acceptInviteSchema
};