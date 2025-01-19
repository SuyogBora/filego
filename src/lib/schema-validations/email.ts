import { z } from "zod";

// Schema for password reset email input
export const PasswordResetEmailSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    resetUrl: z.string().url("Invalid reset URL")
});

// Schema for verification email input
export const VerificationEmailSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    verificationUrl: z.string().url("Invalid verification URL")
});

// Schema for transfer link email input
export const TransferLinkEmailSchema = z.object({
    senderName: z.string().min(1, "Sender name is required"),
    recipientEmail: z.string().email("Invalid recipient email address"),
    transferUrl: z.string().url("Invalid transfer URL"),
    fileName: z.string().min(1, "File name is required"),
    fileSize: z.string().optional(),
    expiryDate: z.string().optional()
});

// Common response schema for all email actions
export const EmailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.any().optional()
});