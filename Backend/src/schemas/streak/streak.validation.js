const { streakQuerySchema } = require("./streak.query.schema");
const { resetStreakSchema } = require("./streak.body.schema");
const { ZodError } = require("zod");
const BadRequestError = require("../../errors/bad.request.error");

function validateGetStreak(req, res, next) {
    try {
        req.validatedQuery = streakQuerySchema.parse(req.query);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            throw new BadRequestError("Validation failed", err.issues);
        }

        throw err;
    }
}

function validateResetStreak(req, res, next) {
    try {
        req.validatedData = resetStreakSchema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            throw new BadRequestError("Validation failed", err.issues);
        }

        throw err;
    }
}

module.exports = {
    validateGetStreak,
    validateResetStreak
};