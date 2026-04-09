const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");

const {
    createGroup,
    inviteUser,
    acceptInvite,
    getMyInvites,
    getMyGroup
} = require("./groups.controller");

router.post("/", authMiddleware, createGroup);
router.post("/invite", authMiddleware, inviteUser);
router.post("/accept", authMiddleware, acceptInvite);
router.get("/invites", authMiddleware, getMyInvites);
router.get("/me", authMiddleware, getMyGroup);

module.exports = router;