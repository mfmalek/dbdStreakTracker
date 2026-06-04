import { Router } from "express";
import * as streakController from "./streak.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import asyncHandler from "../../utils/async.handler";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { streakQuerySchema } from "../../schemas/streak/streak.query.schema";
import { resetStreakSchema } from "../../schemas/streak/streak.body.schema";

const router = Router();

router.get("/", authMiddleware, validateQuery(streakQuerySchema), asyncHandler(streakController.getBestStreak));
router.delete("/", authMiddleware, validateBody(resetStreakSchema), asyncHandler(streakController.resetBestStreak));

export default router;