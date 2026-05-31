const express = require("express");
const router = express.Router();

const controller = require("./survivors.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");
const survivorValidation = require("../../schemas/survivors/survivors.validation");

router.get("/", authMiddleware, survivorValidation.validateGetConfigs, asyncHandler(controller.getConfigs));
router.post("/", authMiddleware, survivorValidation.validateSaveConfigs, asyncHandler(controller.saveConfigs));

module.exports = router;