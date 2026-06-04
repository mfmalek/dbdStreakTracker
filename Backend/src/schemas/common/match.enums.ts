import { z } from "zod";

export const roleSchema = z.enum([
    "killer",
    "survivor"
]);

export const modeSchema = z.enum([
    "killer",
    "solo",
    "duo",
    "trio",
    "squad"
]);