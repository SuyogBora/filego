import { z } from "zod";
import { TransferMode } from "../constants";
import { baseResponseSchemaObj } from "./common";

const validateTransferData = (data: any, ctx: z.RefinementCtx) => {
    if (data.file_is_password_enabled && (!data.file_password || data.file_password.length < 6)) {
        ctx.addIssue({
            path: ["file_password"],
            message: "Password must be at least 6 characters long when enabled.",
            code: z.ZodIssueCode.custom,
        });
    }
    if (data.transfer_mode === "EMAIL_SEND") {
        if (!data.recipient_email) {
            ctx.addIssue({
                path: ["recipient_email"],
                message: "Recipient email is required when sending via email.",
                code: z.ZodIssueCode.custom,
            });
        } else if (!z.string().email().safeParse(data.recipient_email).success) {
            ctx.addIssue({
                path: ["recipient_email"],
                message: "Invalid email address.",
                code: z.ZodIssueCode.custom,
            });
        }
    }
};

export const TransferFormSchema = z.object({
    transfer_title: z.string({ required_error: "Transfer name is required" })
        .min(1, { message: "Transfer name is required." }),
    transfer_message: z.string().optional(),
    transfer_mode: z.enum([TransferMode.EMAIL_SEND, TransferMode.MANUAL_SEND], {
        required_error: "You need to select a transfer mode.",
    }),
    file_password: z.string().optional(),
    file_is_password_enabled: z.boolean().default(false),
    recipient_email: z.string().optional(),
}).superRefine(validateTransferData);

export const AddTransferLogSchema = z.object({
    file_storage_key: z.string().min(1, "File key cannot be empty"),
    transfer_title: z.string().min(1, "Transfer title cannot be empty"),
    file_size: z.number(),
    file_type: z.string().min(1, "File type cannot be empty"),
    file_extension: z.string().min(1, "File extension cannot be empty"),
    transfer_message: z.string().optional(),
    transfer_mode: z.enum([TransferMode.EMAIL_SEND, TransferMode.MANUAL_SEND])
        .default(TransferMode.MANUAL_SEND),
    file_is_password_enabled: z.boolean().default(false),
    file_password: z.string().optional(),
    recipient_email: z.string().optional(),
    user_id: z.string().optional(),
    total_files: z.number().default(0),
    max_downloads: z.number().nullable().default(-1),
    expiration_date: z.date().optional(),
    transfer_display_name: z.string({required_error:"Transfer Display Name Required"}).min(1,{message:"Transfer Display Name Required"}),
}).superRefine(validateTransferData);


export const AddTransferLogResponseSchema = z.object({
    ...baseResponseSchemaObj,
    data: z.object({
        id: z.string()
    })
});

export const UploadPresignedUrlSchema = z.object({
    file_storage_key: z.string(),
    file_type: z.string(),
    user_id: z.string().optional(),
})

export const DownloadPresignedUrlSchema = z.object({
    file_storage_key: z.string(),
    file_type: z.string(),
    file_extension:  z.string(),
    total_files:  z.number(),
    transfer_display_name:z.string()
})

export const PreSignedUrlResponseSchema = z.object({
    ...baseResponseSchemaObj,
    data: z.object({
        url: z.string()
    })
})

