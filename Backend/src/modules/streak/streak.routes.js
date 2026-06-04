const express = require("express");
const router = express.Router();

const streakController = require("./streak.controller");
const authMiddleware = require("../../middlewares/auth.middleware").default;
const asyncHandler = require("../../utils/async.handler");
const { validateBody, validateQuery } = require("../../middlewares/validate.middleware");
const { streakQuerySchema } = require("../../schemas/streak/streak.query.schema");
const { resetStreakSchema } = require("../../schemas/streak/streak.body.schema");

router.get("/", authMiddleware, validateQuery(streakQuerySchema), asyncHandler(streakController.getBestStreak));
router.delete("/", authMiddleware, validateBody(resetStreakSchema), asyncHandler(streakController.resetBestStreak));

module.exports = router;