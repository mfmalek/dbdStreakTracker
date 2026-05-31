const { createPresetSchema } = require("./preset.schema");
const { getPresetsQuerySchema } = require("./presets.query.schema");
const { ZodError } = require("zod");
const BadRequestError = require("../../errors/bad.request.error");

function validateCreatePreset(req, res, next) {
    try {
        req.validatedData = createPresetSchema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            throw new BadRequestError("Validation failed", err.issues);
        }

        throw err;
    }
}

function validateGetPresets(req, res, next) {
    try {
        req.validatedQuery = getPresetsQuerySchema.parse(req.query);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            throw new BadRequestError("Validation failed", err.issues);
        }

        throw err;
    }
}

module.exports = {
    validateCreatePreset,
    validateGetPresets
};