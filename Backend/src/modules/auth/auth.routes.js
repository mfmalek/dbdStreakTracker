const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const asyncHandler = require("../../utils/async.handler");
const { validateAuth } = require("../../schemas/auth/auth.validation");

router.post("/register", validateAuth, asyncHandler(authController.register));
router.post("/login", validateAuth, asyncHandler(authController.login));

module.exports = router;