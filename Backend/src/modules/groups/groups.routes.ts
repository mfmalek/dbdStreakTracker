import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import asyncHandler from "../../utils/async.handler";
import { validateBody, validateQuery, validateParams } from "../../middlewares/validate.middleware";
import { createGroup, inviteUser, acceptInvite, getMyInvites, getMyGroup, getGroupMembers, removeMember, leaveGroup } from "./groups.controller";

const { createGroupSchema } = require("../../schemas/groups/create.group.schema");
const { inviteGroupSchema } = require("../../schemas/groups/invite.group.schema");
const { acceptInviteSchema } = require("../../schemas/groups/accept.invite.schema");
const { getMyGroupSchema } = require("../../schemas/groups/get.my.group.schema");
const { getGroupMembersSchema } = require("../../schemas/groups/get.group.members.schema");
const { removeMemberSchema } = require("../../schemas/groups/remove.member.schema");
const { leaveGroupSchema } = require("../../schemas/groups/leave.group.schema");

const router = Router();

router.post("/", authMiddleware, validateBody(createGroupSchema), asyncHandler(createGroup));
router.post("/invite", authMiddleware, validateBody(inviteGroupSchema), asyncHandler(inviteUser));
router.post("/accept", authMiddleware, validateBody(acceptInviteSchema), asyncHandler(acceptInvite));
router.get("/invites", authMiddleware, asyncHandler(getMyInvites));
router.get("/me", authMiddleware, validateQuery(getMyGroupSchema), asyncHandler(getMyGroup));
router.get("/:groupId/members", authMiddleware, validateParams(getGroupMembersSchema), asyncHandler(getGroupMembers));
router.post("/remove", authMiddleware, validateBody(removeMemberSchema), asyncHandler(removeMember));
router.post("/leave", authMiddleware, validateBody(leaveGroupSchema), asyncHandler(leaveGroup));

export default router;