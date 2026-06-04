import { Router } from "express";
import * as presetsController from "./presets.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import asyncHandler from "../../utils/async.handler";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";

const { createPresetSchema } = require("../../schemas/presets/preset.schema");
const { getPresetsQuerySchema } = require("../../schemas/presets/presets.query.schema");

const router = Router();

router.get("/", authMiddleware, validateQuery(getPresetsQuerySchema), asyncHandler(presetsController.getPresets));
router.post("/", authMiddleware, validateBody(createPresetSchema), asyncHandler(presetsController.createPreset));
router.delete("/:id", authMiddleware, asyncHandler(presetsController.deletePreset));

export default router;