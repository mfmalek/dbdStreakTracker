import { Router } from "express";
import * as authController from "./auth.controller";
import asyncHandler from "../../utils/async.handler";
import { validateBody } from "../../middlewares/validate.middleware";
import { authSchema } from "../../schemas/auth/auth.schema";

const router = Router();

router.post("/register", validateBody(authSchema), asyncHandler(authController.register));
router.post("/login", validateBody(authSchema), asyncHandler(authController.login));

export default router;