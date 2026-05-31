const express = require("express");
const router = express.Router();

const streakController = require("./streak.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");

router.get("/", authMiddleware, asyncHandler(streakController.getBestStreak));
router.delete("/", authMiddleware, asyncHandler(streakController.resetBestStreak));

module.exports = router;