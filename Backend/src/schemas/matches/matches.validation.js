const { survivorMatchSchema } = require("./survivor.match.schema");
const { killerMatchSchema } = require("./killer.match.schema");
const BadRequestError = require("../../errors/bad.request.error");

const validateMatchByRole = (req, res, next) => {
    const { role } = req.body;

    if (role === "killer") {
        req.validatedBody = killerMatchSchema.parse(req.body);
        return next();
    }

    if (role === "survivor") {
        req.validatedBody = survivorMatchSchema.parse(req.body);
        return next();
    }

    throw new BadRequestError("Invalid role");
};

module.exports = {
    validateMatchByRole
};