const express = require('express');
const router = express.Router();
const matchesController = require('./matches.controller');
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");
const matchValidation = require("../../schemas/matches/matches.validation");
const { validateQuery, validateParams } = require("../../middlewares/validate.middleware");
const { getMatchesQuerySchema, deleteMatchParamsSchema } = require("../../schemas/matches/matches.query.schema");

router.get('/', authMiddleware,  validateQuery(getMatchesQuerySchema), asyncHandler(matchesController.getMatches));
router.post('/', authMiddleware, matchValidation.validateMatchByRole, asyncHandler(matchesController.createMatch));
router.put('/:id', authMiddleware, asyncHandler(matchesController.updateMatch));
router.delete('/:id', authMiddleware, validateParams(deleteMatchParamsSchema),asyncHandler(matchesController.deleteMatch));
router.delete("/", authMiddleware, asyncHandler(matchesController.clearMatches));

module.exports = router;