import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import asyncHandler from "../../utils/async.handler";
import { validateBody, validateQuery, validateParams } from "../../middlewares/validate.middleware";

import { createGroup, inviteUser, acceptInvite, getMyInvites, getMyGroup, getGroupMembers, removeMember, leaveGroup } from "./groups.controller";
import { createGroupSchema } from "../../schemas/groups/create.group.schema";
import { inviteGroupSchema } from "../../schemas/groups/invite.group.schema";
import { acceptInviteSchema } from "../../schemas/groups/accept.invite.schema";
import { getMyGroupSchema } from "../../schemas/groups/get.my.group.schema";
import { getGroupMembersSchema } from "../../schemas/groups/get.group.members.schema";
import { removeMemberSchema } from "../../schemas/groups/remove.member.schema";
import { leaveGroupSchema } from "../../schemas/groups/leave.group.schema";

const router = Router();

router.get("/me", authMiddleware, validateQuery(getMyGroupSchema), asyncHandler(getMyGroup));
router.get("/invites", authMiddleware, asyncHandler(getMyInvites));
router.get("/:groupId/members", authMiddleware, validateParams(getGroupMembersSchema), asyncHandler(getGroupMembers));
router.post("/", authMiddleware, validateBody(createGroupSchema), asyncHandler(createGroup));
router.post("/invite", authMiddleware, validateBody(inviteGroupSchema), asyncHandler(inviteUser));
router.post("/accept", authMiddleware, validateBody(acceptInviteSchema), asyncHandler(acceptInvite));
router.post("/remove", authMiddleware, validateBody(removeMemberSchema), asyncHandler(removeMember));
router.post("/leave", authMiddleware, validateBody(leaveGroupSchema), asyncHandler(leaveGroup));

export default router;