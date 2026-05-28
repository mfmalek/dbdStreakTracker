const BadRequestError = require("../errors/bad.request.error");

const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse(req.body);

            next();
        } catch (error) {
            next(
                new BadRequestError(
                    "Validation failed",
                    error.issues
                )
            );
        }
    };
};

module.exports = {
    validate
};