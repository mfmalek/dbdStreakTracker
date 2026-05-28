const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse(req.body);

            next();
        } catch (error) {
            error.status = 400;
            next(error);
        }
    };
};

module.exports = {
    validate
};