const express = require('express');
const router = express.Router();
const matchesController = require('./matches.controller');
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/asyncHandler");

router.get('/', authMiddleware, asyncHandler(matchesController.getMatches));
router.post('/', authMiddleware, asyncHandler(matchesController.createMatch));
router.delete('/:id', authMiddleware, asyncHandler(matchesController.deleteMatch));
router.delete("/", authMiddleware, asyncHandler(matchesController.clearMatches));

module.exports = router;