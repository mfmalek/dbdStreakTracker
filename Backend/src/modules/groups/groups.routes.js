const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/async.handler");
const groupsValidation = require("../../schemas/groups/groups.validation");

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

router.post("/", authMiddleware,  groupsValidation.validateCreateGroup, asyncHandler(createGroup));
router.post("/invite", authMiddleware, groupsValidation.validateInviteUser, asyncHandler(inviteUser));
router.post("/accept", authMiddleware, groupsValidation.validateAcceptInvite, asyncHandler(acceptInvite));
router.get("/invites", authMiddleware, asyncHandler(getMyInvites));
router.get("/me", authMiddleware, asyncHandler(getMyGroup));
router.get("/:groupId/members", authMiddleware, asyncHandler(getGroupMembers));
router.post("/remove", authMiddleware, groupsValidation.validateRemoveMember, asyncHandler(removeMember));
router.post("/leave", authMiddleware, groupsValidation.validateLeaveGroup, asyncHandler(leaveGroup));

module.exports = router;