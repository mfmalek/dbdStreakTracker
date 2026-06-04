const express = require("express");
const router = express.Router();

const presetsController = require("./presets.controller");
const authMiddleware = require("../../middlewares/auth.middleware").default;
const asyncHandler = require("../../utils/async.handler");
const { validateBody, validateQuery } = require("../../middlewares/validate.middleware");
const { createPresetSchema } = require("../../schemas/presets/preset.schema");
const { getPresetsQuerySchema } = require("../../schemas/presets/presets.query.schema");

router.get("/", authMiddleware, validateQuery(getPresetsQuerySchema), asyncHandler(presetsController.getPresets));
router.post("/", authMiddleware, validateBody(createPresetSchema), asyncHandler(presetsController.createPreset));
router.delete("/:id", authMiddleware, asyncHandler(presetsController.deletePreset));

module.exports = router;