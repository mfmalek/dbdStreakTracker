const { z } = require("zod");
const { modeSchema } = require("../common/match.enums");

const getMyGroupSchema = z.object({
    mode: modeSchema.exclude(["killer"])
});

module.exports = {
    getMyGroupSchema
};