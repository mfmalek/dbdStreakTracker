const { survivorMatchSchema } = require("./survivor.match.schema");
const { killerMatchSchema } = require("./killer.match.schema");
const BadRequestError = require("../../errors/bad.request.error");

const validateMatchByRole = (req, res, next) => {
    const { role } = req.body;

    if (role === "killer") {
        const payload = {
            kills: req.body.kills,
            killerPerks: req.body.killerPerks,
            killerAddons: req.body.killerAddons,
            mapName: req.body.mapName
        };

        req.validatedData = killerMatchSchema.parse(payload);

        return next();
    }

    if (role === "survivor") {
        const payload = {
            survivors: req.body.survivors,
            killerName: req.body.killerName,
            killerPerks: req.body.killerPerks,
            mapName: req.body.mapName
        };

        req.validatedData = survivorMatchSchema.parse(payload);

        return next();
    }

    throw new BadRequestError("Invalid role");
};

module.exports = {
    validateMatchByRole
};