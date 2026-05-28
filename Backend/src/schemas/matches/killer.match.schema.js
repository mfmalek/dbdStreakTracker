const { z } = require("zod");

const killerMatchSchema = z.object({
    kills: z.number().min(0).max(4),
    killerPerks: z.array(z.string()).max(4),
    killerAddons: z.array(z.string()).max(2),
    mapName: z.string()
}).strict();

module.exports = {
    killerMatchSchema
};