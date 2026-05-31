const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const asyncHandler = require("../../utils/async.handler");
const { validateBody } = require("../../middlewares/validate.middleware");
const { authSchema } = require("../../schemas/auth/auth.schema");

router.post("/register", validateBody(authSchema), asyncHandler(authController.register));
router.post("/login", validateBody(authSchema), asyncHandler(authController.login));

module.exports = router;