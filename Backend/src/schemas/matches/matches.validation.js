const { validate } = require("../../middlewares/validate.middleware");
const { survivorMatchSchema } = require("../../schemas/matches/survivor.match.schema");
const { killerMatchSchema } = require("../../schemas/matches/killer.match.schema");

const validateMatchByRole = (req, res, next) => {
    const { role } = req.body;

    if (role === "killer") {
        return validate(killerMatchSchema)(req, res, next);
    }

    if (role === "survivor") {
        return validate(survivorMatchSchema)(req, res, next);
    }

    const err = new Error("Invalid role");
    err.status(400);

    return next(err);
};

module.exports = {
    validateMatchByRole
};