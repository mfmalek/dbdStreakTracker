const { createGroupSchema } = require("./create.group.schema");
const { inviteGroupSchema } = require("./invite.group.schema");
const { acceptInviteSchema } = require("./accept.invite.schema");
const { removeMemberSchema } = require("./remove.member.schema");
const { leaveGroupSchema } = require("./leave.group.schema");
const { ZodError } = require("zod");
const BadRequestError = require("../../errors/bad.request.error");

function validate(schema) {
    return (req, res, next) => {
        try {
            req.validatedData = schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return next(new BadRequestError("Validation failed", err.issues));
            }

            next(err);
        }
    };
}

module.exports = {
    validateCreateGroup: validate(createGroupSchema),
    validateInviteUser: validate(inviteGroupSchema),
    validateAcceptInvite: validate(acceptInviteSchema),
    validateRemoveMember: validate(removeMemberSchema),
    validateLeaveGroup: validate(leaveGroupSchema)
};