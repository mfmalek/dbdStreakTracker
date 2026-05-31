const { saveConfigsSchema, getConfigsSchema } = require("./survivor.config.schema");
const { ZodError } = require("zod");
const BadRequestError = require("../../errors/bad.request.error");

function validateGetConfigs(req, res, next) {
    try {
        req.validatedQuery = getConfigsSchema.parse(req.query);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            throw new BadRequestError("Validation failed", err.issues);
        }

        throw err;
    }
}

function validateSaveConfigs(req, res, next) {
    try {
        req.validatedData = saveConfigsSchema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            throw new BadRequestError("Validation failed", err.issues);
        }

        throw err;
    }
}

module.exports = {
    validateGetConfigs,
    validateSaveConfigs
};