const { z } = require("zod");
const { roleSchema, modeSchema } = require("../common/match.enums");

const streakQuerySchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    groupId: z.coerce.number().int().positive().optional()
}).strict();

module.exports = {
    streakQuerySchema
};