const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");

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

router.post("/", authMiddleware, createGroup);
router.post("/invite", authMiddleware, inviteUser);
router.post("/accept", authMiddleware, acceptInvite);
router.get("/invites", authMiddleware, getMyInvites);
router.get("/me", authMiddleware, getMyGroup);
router.get("/:groupId/members", authMiddleware, getGroupMembers);
router.post("/remove", authMiddleware, removeMember);
router.post("/leave", authMiddleware, leaveGroup);

module.exports = router;