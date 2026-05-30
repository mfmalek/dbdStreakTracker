const { authSchema } = require("./auth.schema");
const ZodError = require("../../errors/zod.error")

const validateAuth = (req, res, next) => {
    try {
        req.validatedData = authSchema.parse(req.body);
        next();
    } catch (err) {
        throw new ZodError(err);
    }
};

module.exports = {
    validateAuth
};