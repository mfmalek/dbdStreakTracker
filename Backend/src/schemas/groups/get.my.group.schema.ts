import { z } from "zod";
import { modeSchema } from "../common/match.enums";

export const getMyGroupSchema = z.object({
    mode: modeSchema
});