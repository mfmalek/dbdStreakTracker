import { Request, Response } from "express";
import * as groupsService from "./groups.service";

export const createGroup = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;

    const { mode } = req.validatedBody as {
        mode: string;
    };

    const group = await groupsService.createGroup(username, mode);

    res.json(group);
};

export const inviteUser = async (req: Request, res: Response): Promise<void> => {
    const fromUser = req.user!.username;

    const { toUser, groupId, mode } = req.validatedBody as {
        toUser: string;
        groupId?: number;
        mode: string;
    };

    const invite = await groupsService.inviteUser(fromUser, toUser, groupId ?? null, mode);

    res.json(invite);
};

export const getMyInvites = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;
    const invites = await groupsService.getMyInvites(username);

    res.json(invites);
};

export const acceptInvite = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;

    const { inviteId } = req.validatedBody as {
        inviteId: number;
    };

    const result = await groupsService.acceptInvite(username, inviteId);

    res.json(result);
};

export const getMyGroup = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;

    const { mode } = req.validatedQuery as {
        mode: string;
    };

    const group = await groupsService.getMyGroup(username, mode);

    res.json(group);
};

export const getGroupMembers = async (req: Request, res: Response): Promise<void> => {
    const { groupId } = req.validatedParams as {
        groupId: string | number;
    };

    const members = await groupsService.getGroupMembers(Number(groupId));

    res.json(members);
};

export const removeMember = async (req: Request, res: Response): Promise<void> => {
    const owner = req.user!.username;

    const { groupId, targetUser } = req.validatedBody as {
        groupId: number;
        targetUser: string;
    };

    const result = await groupsService.removeMember(
        owner,
        groupId,
        targetUser
    );

    res.json(result);
};

export const leaveGroup = async (req: Request, res: Response): Promise<void> => {
    const username = req.user!.username;

    const { groupId } = req.validatedBody as {
        groupId: number;
    };

    const result = await groupsService.leaveGroup(username, groupId);

    res.json(result);
};