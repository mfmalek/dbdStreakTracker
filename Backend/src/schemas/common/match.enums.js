const { z } = require("zod");

const roleSchema = z.enum([
    "killer",
    "survivor"
]);

const modeSchema = z.enum([
    "killer",
    "solo",
    "duo",
    "trio",
    "squad"
]);

module.exports = {
    roleSchema,
    modeSchema
};