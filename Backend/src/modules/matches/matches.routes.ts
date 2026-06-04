import { Router } from "express";
import * as matchesController from "./matches.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import asyncHandler from "../../utils/async.handler";
import { validateQuery, validateParams } from "../../middlewares/validate.middleware";

const matchValidation = require("../../schemas/matches/matches.validation");
const { getMatchesQuerySchema, deleteMatchParamsSchema } = require("../../schemas/matches/matches.query.schema");
const { clearMatchesQuerySchema } = require("../../schemas/matches/clear.matches.query.schema");

const router = Router();

router.get("/", authMiddleware, validateQuery(getMatchesQuerySchema), asyncHandler(matchesController.getMatches));
router.post("/", authMiddleware, matchValidation.validateMatchByRole, asyncHandler(matchesController.createMatch));
router.put("/:id", authMiddleware, asyncHandler(matchesController.updateMatch));
router.delete("/:id", authMiddleware, validateParams(deleteMatchParamsSchema), asyncHandler(matchesController.deleteMatch));
router.delete("/", authMiddleware, validateQuery(clearMatchesQuerySchema), asyncHandler(matchesController.clearMatches));

export default router;