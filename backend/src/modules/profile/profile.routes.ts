import { Router } from "express";

import asyncHandler from "../../utils/async.handler";
import authMiddleware from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";

import { getProfile, changeUsername, changePassword, deleteAccount, getStreaks } from "./profile.controller";
import { changeUsernameSchema } from "../../schemas/profile/change.username.schema";
import { changePasswordSchema } from "../../schemas/profile/change.password.schema";
import { deleteAccountSchema } from "../../schemas/profile/delete.account.schema";

const router = Router();

router.get("/me", authMiddleware, asyncHandler(getProfile));
router.get("/streaks", authMiddleware, asyncHandler(getStreaks));
router.patch("/username", authMiddleware, validateBody(changeUsernameSchema), asyncHandler(changeUsername));
router.patch("/password", authMiddleware, validateBody(changePasswordSchema), asyncHandler(changePassword));
router.delete("/delete", authMiddleware, validateBody(deleteAccountSchema), asyncHandler(deleteAccount));

export default router;