const express = require("express");
const router = express.Router();
const streakController = require("./streak.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.get("/", authMiddleware, streakController.getBestStreak);
router.delete("/", authMiddleware, streakController.resetBestStreak);

module.exports = router;