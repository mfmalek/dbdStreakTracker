import { Router } from "express";

import asyncHandler from "../../utils/async.handler";
import authMiddleware from "../../middlewares/auth.middleware";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";

import { getPresets, createPreset, deletePreset } from "./presets.controller";
import { createPresetSchema } from "../../schemas/presets/preset.schema";
import { getPresetsQuerySchema } from "../../schemas/presets/presets.query.schema";

const router = Router();

router.get("/", authMiddleware, validateQuery(getPresetsQuerySchema), asyncHandler(getPresets));
router.post("/", authMiddleware, validateBody(createPresetSchema), asyncHandler(createPreset));
router.delete("/:id", authMiddleware, asyncHandler(deletePreset));

export default router;