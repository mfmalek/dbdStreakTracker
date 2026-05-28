const { validate } = require("../../middlewares/validate.middleware");
const { survivorMatchSchema } = require("./survivor.match.schema");
const { killerMatchSchema } = require("./killer.match.schema");

const validateMatchByRole = (req, res, next) => {
    const { role } = req.body;

    if (role === "killer") {
        const {
            kills,
            killerPerks,
            killerAddons,
            mapName
        } = req.body;

        req.body = {
            kills,
            killerPerks,
            killerAddons,
            mapName
        };

        return validate(killerMatchSchema)(req, res, next);
    }

    if (role === "survivor") {
        const {
            survivors,
            killerName,
            killerPerks,
            mapName
        } = req.body;

        req.body = {
            survivors,
            killerName,
            killerPerks,
            mapName
        };

        return validate(survivorMatchSchema)(req, res, next);
    }

    const err = new Error("Invalid role");
    err.status = 400;

    return next(err);
};

module.exports = {
    validateMatchByRole
};