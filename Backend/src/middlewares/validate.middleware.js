import BadRequestError from "../errors/bad.request.error";

const { ZodError } = require("zod");

function createValidator(source, target) {
    return (schema) => {
        return (req, res, next) => {
            try {
                req[target] = schema.parse(req[source]);
                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    return next(new BadRequestError("Validation failed", err.issues));
                }

                next(err);
            }
        };
    };
}

const validateBody = createValidator("body", "validatedBody");
const validateQuery = createValidator("query", "validatedQuery");
const validateParams = createValidator("params", "validatedParams");

module.exports = {
    validateBody,
    validateQuery,
    validateParams
};