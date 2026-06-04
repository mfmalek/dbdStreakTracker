import { z } from "zod";
import { modeSchema } from "../common/match.enums";

export const survivorConfigSchema = z.object({
    name: z.string().min(1).max(30),
    image: z.string().min(1)
});

export const saveConfigsSchema = z.object({
    mode: modeSchema.exclude(["killer"]),
    configs: z.array(survivorConfigSchema).min(1).max(4)
}).strict();

export const getConfigsSchema = z.object({
    mode: modeSchema.exclude(["killer"])
}).strict();