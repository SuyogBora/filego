import { z } from "zod";

export const VerifyPasswordFormSchema = z.object({
    password: z.string().min(1, { message: 'Password Is Required' }),
});

export const VerifyTransferPasswordSchema = z.object({
    id: z.string(),
    password: z.string().min(1, "Password cannot be empty."),
});

export const VerifyTransferPasswordResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z
        .object({
            fileStorageKey: z.string(),
        }),
});