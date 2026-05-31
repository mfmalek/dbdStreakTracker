const { z } = require("zod");
const { modeSchema } = require("../common/match.enums");

const createGroupSchema = z.object({
    mode: modeSchema.exclude(["killer"])
}).strict();

module.exports = {
    createGroupSchema
};