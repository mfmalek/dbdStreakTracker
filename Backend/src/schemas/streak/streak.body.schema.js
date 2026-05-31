const { z } = require("zod");
const { roleSchema, modeSchema } = require("../common/match.enums");

const resetStreakSchema = z.object({
    mode: modeSchema,
    role: roleSchema,
    killerName: z.string().optional(),
    groupId: z.number().int().positive().nullish()
}).strict();

module.exports = {
    resetStreakSchema
};