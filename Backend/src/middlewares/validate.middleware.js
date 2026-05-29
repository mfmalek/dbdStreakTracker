const validateBody = (schema) => {
    return (req, res, next) => {
        req.validatedBody = schema.parse(req.body);
        next();
    };
};

const validateQuery = (schema) => {
    return (req, res, next) => {
        req.validatedQuery = schema.parse(req.query);
        next();
    };
};

const validateParams = (schema) => {
    return (req, res, next) => {
        req.validatedParams = schema.parse(req.params);
        next();
    };
};

module.exports = {
    validateBody,
    validateQuery,
    validateParams
};