const express = require("express");
const router = express.Router();
const controller = require("./survivors.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/asyncHandler");

router.get("/", authMiddleware, asyncHandler(controller.getConfigs));
router.post("/", authMiddleware, asyncHandler(controller.saveConfigs));

module.exports = router;