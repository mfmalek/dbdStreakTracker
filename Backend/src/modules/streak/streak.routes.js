const express = require("express");
const router = express.Router();

const streakController = require("./streak.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");
const streakValidation = require("../../schemas/streak/streak.validation");

router.get("/", authMiddleware, streakValidation.validateGetStreak, asyncHandler(streakController.getBestStreak));
router.delete("/", authMiddleware, streakValidation.validateResetStreak, asyncHandler(streakController.resetBestStreak));

module.exports = router;