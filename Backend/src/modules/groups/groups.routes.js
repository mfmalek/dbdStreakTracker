const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");

const { validateBody } = require("../../middlewares/validate.middleware");
const { createGroupSchema } = require("../../schemas/groups/create.group.schema");
const { inviteGroupSchema } = require("../../schemas/groups/invite.group.schema");
const { acceptInviteSchema } = require("../../schemas/groups/accept.invite.schema");
const { removeMemberSchema } = require("../../schemas/groups/remove.member.schema");
const { leaveGroupSchema } = require("../../schemas/groups/leave.group.schema");

const {
    createGroup,
    inviteUser,
    acceptInvite,
    getMyInvites,
    getMyGroup,
    getGroupMembers,
    removeMember,
    leaveGroup
} = require("./groups.controller");

router.post("/", authMiddleware,  validateBody(createGroupSchema), asyncHandler(createGroup));
router.post("/invite", authMiddleware, validateBody(inviteGroupSchema), asyncHandler(inviteUser));
router.post("/accept", authMiddleware, validateBody(acceptInviteSchema), asyncHandler(acceptInvite));
router.get("/invites", authMiddleware, asyncHandler(getMyInvites));
router.get("/me", authMiddleware, asyncHandler(getMyGroup));
router.get("/:groupId/members", authMiddleware, asyncHandler(getGroupMembers));
router.post("/remove", authMiddleware, validateBody(removeMemberSchema), asyncHandler(removeMember));
router.post("/leave", authMiddleware, validateBody(leaveGroupSchema), asyncHandler(leaveGroup));

module.exports = router;