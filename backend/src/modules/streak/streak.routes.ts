import { Router } from "express";

import asyncHandler from "../../utils/async.handler";
import authMiddleware from "../../middlewares/auth.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";

import { getBestStreak, resetBestStreak }  from "./streak.controller";
import { streakQuerySchema } from "../../schemas/streak/streak.query.schema";
import { resetStreakSchema } from "../../schemas/streak/streak.body.schema";

const router = Router();

router.get("/", authMiddleware, validateQuery(streakQuerySchema), asyncHandler(getBestStreak));
router.delete("/", authMiddleware, validateBody(resetStreakSchema), asyncHandler(resetBestStreak));

export default router;