import { Router } from "express";
import * as authController from "./auth.controller";
import asyncHandler from "../../utils/async.handler";
import { validateBody } from "../../middlewares/validate.middleware";

const router = Router();
const { authSchema } = require("../../schemas/auth/auth.schema");

router.post("/register", validateBody(authSchema), asyncHandler(authController.register));
router.post("/login", validateBody(authSchema), asyncHandler(authController.login));

export default router;