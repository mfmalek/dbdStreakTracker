const { z } = require("zod");
const { modeSchema } = require("../common/match.enums");

const survivorConfigSchema = z.object({
    name: z.string().min(1).max(30),
    image: z.string().min(1)
});

const saveConfigsSchema = z.object({
    mode: modeSchema.exclude(["killer"]),
    configs: z.array(survivorConfigSchema).min(1).max(4)
}).strict();

const getConfigsSchema = z.object({
    mode: modeSchema.exclude(["killer"])
}).strict();

module.exports = {
    survivorConfigSchema,
    saveConfigsSchema,
    getConfigsSchema
};