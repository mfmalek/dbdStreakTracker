import { Router } from "express";
import * as matchesController from "./matches.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import asyncHandler from "../../utils/async.handler";
import { validateQuery, validateParams } from "../../middlewares/validate.middleware";
import { validateMatchByRole } from "../../schemas/matches/matches.validation";
import { getMatchesQuerySchema, deleteMatchParamsSchema } from "../../schemas/matches/matches.query.schema";
import { clearMatchesQuerySchema } from "../../schemas/matches/clear.matches.query.schema";

const router = Router();

router.get("/", authMiddleware, validateQuery(getMatchesQuerySchema), asyncHandler(matchesController.getMatches));
router.post("/", authMiddleware, validateMatchByRole, asyncHandler(matchesController.createMatch));
router.put("/:id", authMiddleware, asyncHandler(matchesController.updateMatch));
router.delete("/:id", authMiddleware, validateParams(deleteMatchParamsSchema), asyncHandler(matchesController.deleteMatch));
router.delete("/", authMiddleware, validateQuery(clearMatchesQuerySchema), asyncHandler(matchesController.clearMatches));

export default router;