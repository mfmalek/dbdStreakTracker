import { z } from "zod";
import { modeSchema } from "../common/match.enums";

export const createGroupSchema = z.object({
    mode: modeSchema.exclude(["killer"])
}).strict();