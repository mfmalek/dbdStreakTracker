const { z } = require("zod");
const { roleSchema, modeSchema } = require("../common/match.enums");

const getPresetsQuerySchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    survivor: z.coerce.number().int().min(0).max(3).optional()
}).strict();

module.exports = {
    getPresetsQuerySchema
};