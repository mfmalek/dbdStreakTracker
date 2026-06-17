import { z } from "zod";

export const roleSchema = z.enum([
    "survivor",
    "killer"
]);

export const modeSchema = z.enum([
    "solo",
    "duo",
    "trio",
    "squad",
    "killer"
]);