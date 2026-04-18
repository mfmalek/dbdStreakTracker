const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/asyncHandler");

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

router.post("/", authMiddleware, asyncHandler(createGroup));
router.post("/invite", authMiddleware, asyncHandler(inviteUser));
router.post("/accept", authMiddleware, asyncHandler(acceptInvite));
router.get("/invites", authMiddleware, asyncHandler(getMyInvites));
router.get("/me", authMiddleware, asyncHandler(getMyGroup));
router.get("/:groupId/members", authMiddleware, asyncHandler(getGroupMembers));
router.post("/remove", authMiddleware, asyncHandler(removeMember));
router.post("/leave", authMiddleware, asyncHandler(leaveGroup));

module.exports = router;