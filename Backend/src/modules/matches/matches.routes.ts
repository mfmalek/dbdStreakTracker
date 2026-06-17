import { Router } from "express";

import asyncHandler from "../../utils/async.handler";
import authMiddleware from "../../middlewares/auth.middleware";
import { validateQuery, validateParams } from "../../middlewares/validate.middleware";

import { getMatches, createMatch, updateMatch, deleteMatch, clearMatches } from "./matches.controller";
import { validateMatchByRole } from "../../schemas/matches/matches.validation";
import { getMatchesQuerySchema, deleteMatchParamsSchema } from "../../schemas/matches/matches.query.schema";
import { clearMatchesQuerySchema } from "../../schemas/matches/clear.matches.query.schema";

const router = Router();

router.get("/", authMiddleware, validateQuery(getMatchesQuerySchema), asyncHandler(getMatches));
router.post("/", authMiddleware, validateMatchByRole, asyncHandler(createMatch));
router.put("/:id", authMiddleware, asyncHandler(updateMatch));
router.delete("/:id", authMiddleware, validateParams(deleteMatchParamsSchema), asyncHandler(deleteMatch));
router.delete("/", authMiddleware, validateQuery(clearMatchesQuerySchema), asyncHandler(clearMatches));

export default router;