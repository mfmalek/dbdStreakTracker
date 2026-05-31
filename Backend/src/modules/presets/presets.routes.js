const express = require("express");
const router = express.Router();

const presetsController = require("./presets.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");
const presetValidation = require("../../schemas/presets/presets.validation");

router.get("/", authMiddleware, presetValidation.validateGetPresets, asyncHandler(presetsController.getPresets));
router.post("/", authMiddleware, presetValidation.validateCreatePreset, asyncHandler(presetsController.createPreset));
router.delete("/:id", authMiddleware, asyncHandler(presetsController.deletePreset));

module.exports = router;