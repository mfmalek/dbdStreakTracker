const express = require("express");
const router = express.Router();

const controller = require("./survivors.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");
const { validateBody, validateQuery } = require("../../middlewares/validate.middleware");
const { getConfigsSchema, saveConfigsSchema } = require("../../schemas/survivors/survivor.config.schema");

router.get("/", authMiddleware, validateQuery(getConfigsSchema), asyncHandler(controller.getConfigs));
router.post("/", authMiddleware, validateBody(saveConfigsSchema), asyncHandler(controller.saveConfigs));

module.exports = router;