const express = require("express");
const router = express.Router();
const presetsController = require("./presets.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/asyncHandler");

router.get("/", authMiddleware, asyncHandler(presetsController.getPresets));
router.post("/", authMiddleware, asyncHandler(presetsController.createPreset));
router.delete("/:id", authMiddleware, asyncHandler(presetsController.deletePreset));

module.exports = router;