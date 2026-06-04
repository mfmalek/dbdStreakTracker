import { Router } from "express";
import * as controller from "./survivors.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import asyncHandler from "../../utils/async.handler";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { getConfigsSchema, saveConfigsSchema } from "../../schemas/survivors/survivor.config.schema";

const router = Router();

router.get("/", authMiddleware, validateQuery(getConfigsSchema), asyncHandler(controller.getConfigs));
router.post("/", authMiddleware, validateBody(saveConfigsSchema), asyncHandler(controller.saveConfigs));

export default router;