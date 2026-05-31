const { z } = require("zod");

const getGroupMembersSchema = z.object({
    groupId: z.coerce.number().int().positive()
});

module.exports = {
    getGroupMembersSchema
};