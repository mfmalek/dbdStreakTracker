const express = require('express');
const router = express.Router();
const matchesController = require('./matches.controller');
const authMiddleware = require("../../middlewares/auth.middleware");

router.get('/', authMiddleware, matchesController.getMatches);
router.post('/', authMiddleware, matchesController.createMatch);
router.delete('/:id', authMiddleware, matchesController.deleteMatch);
router.delete("/", authMiddleware, matchesController.clearMatches);

module.exports = router;