const { z } = require("zod");
const { roleSchema, modeSchema } = require("../common/match.enums");

const getMatchesQuerySchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    groupId: z.coerce.number().optional()
});

const deleteMatchParamsSchema = z.object({
    id: z.coerce.number().positive()
});

module.exports = {
    getMatchesQuerySchema,
    deleteMatchParamsSchema
};