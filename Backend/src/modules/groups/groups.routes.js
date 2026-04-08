const express = require("express");
const router = express.Router();

const {
    createGroup,
    inviteUser,
    acceptInvite,
    getMyInvites,
    getMyGroup
} = require("./groups.controller");

router.post("/", createGroup);
router.post("/invite", inviteUser);
router.post("/accept", acceptInvite);
router.get("/invites", getMyInvites);
router.get("/me", getMyGroup);

module.exports = router;