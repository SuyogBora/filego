import { z } from "zod";

export const baseResponseSchemaObj = {
    success: z.boolean(),
    message: z.string(),
}