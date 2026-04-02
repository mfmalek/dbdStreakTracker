const express = require("express");
const router = express.Router();
const controller = require("./survivors.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.get("/", authMiddleware, controller.getConfigs);
router.post("/", authMiddleware, controller.saveConfigs);

module.exports = router;