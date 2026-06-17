import { Router } from "express";

import asyncHandler from "../../utils/async.handler";
import { validateBody } from "../../middlewares/validate.middleware";

import { register, login } from "./auth.controller";
import { authSchema } from "../../schemas/auth/auth.schema";

const router = Router();

router.post("/register", validateBody(authSchema), asyncHandler(register));
router.post("/login", validateBody(authSchema), asyncHandler(login));

export default router;