const { z } = require("zod");
const { roleSchema, modeSchema } = require("../common/match.enums");

const createPresetSchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    survivor: z.number().int().min(0).max(3).optional(),
    name: z.string().min(1).max(30),
    perks: z.array(z.string()).max(4)
}).strict();

module.exports = {
    createPresetSchema
};