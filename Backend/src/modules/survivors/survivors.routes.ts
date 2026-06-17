import { Router } from "express";

import asyncHandler from "../../utils/async.handler";
import authMiddleware from "../../middlewares/auth.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";

import { getConfigs, saveConfigs} from "./survivors.controller";
import { getConfigsSchema, saveConfigsSchema } from "../../schemas/survivors/survivor.config.schema";

const router = Router();

router.get("/", authMiddleware, validateQuery(getConfigsSchema), asyncHandler(getConfigs));
router.post("/", authMiddleware, validateBody(saveConfigsSchema), asyncHandler(saveConfigs));

export default router;