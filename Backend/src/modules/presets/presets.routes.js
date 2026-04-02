const express = require("express");
const router = express.Router();
const presetsController = require("./presets.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.get("/", authMiddleware, presetsController.getPresets);
router.post("/", authMiddleware, presetsController.createPreset);
router.delete("/:id", authMiddleware, presetsController.deletePreset);

module.exports = router;