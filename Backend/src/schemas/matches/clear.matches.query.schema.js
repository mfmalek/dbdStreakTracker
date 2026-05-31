const { z } = require("zod");
const { roleSchema, modeSchema } = require("../common/match.enums");

const clearMatchesQuerySchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    groupId: z.coerce.number().optional()
});

module.exports = {
    clearMatchesQuerySchema
};