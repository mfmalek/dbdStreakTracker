const { z } = require("zod");

const roleSchema = z.enum([
    "killer",
    "survivor"
]);

const modeSchema = z.enum([
    "solo",
    "duo",
    "trio",
    "squad"
]);

module.exports = {
    roleSchema,
    modeSchema
};