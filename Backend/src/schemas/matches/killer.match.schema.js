const { z } = require("zod");

const killerSchema = z.object({
    perks: z.array(z.string()).max(4),
    addons: z.array(z.string()).max(2)
}).strict();

const killerMatchSchema = z.object({
    killer: killerSchema,
    kills: z.number().min(0).max(4),
    mapName: z.string()
}).strict();

module.exports = {
    killerSchema,
    killerMatchSchema
};