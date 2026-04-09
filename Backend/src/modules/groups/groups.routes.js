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

router.use(authMiddleware);

router.post("/", createGroup);
router.post("/invite", inviteUser);
router.post("/accept", acceptInvite);
router.get("/invites", getMyInvites);
router.get("/me", getMyGroup);

module.exports = router;