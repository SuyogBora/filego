"use server";

import { SALT_ROUND } from "@/lib/constants";
import { AppError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { s3Client } from "@/lib/s3";
import { VerifyTransferPasswordResponseSchema, VerifyTransferPasswordSchema } from "@/lib/schema-validations/download";
import { AddTransferLogResponseSchema, AddTransferLogSchema, DownloadPresignedUrlSchema, PreSignedUrlResponseSchema, UpdateTransferMatricsSchema, UploadPresignedUrlSchema } from "@/lib/schema-validations/transfer";
import { formatFileSize, generateDownloadFileName, generateDownloadUrl } from "@/lib/utils";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import bcryptjs from "bcryptjs";
import { format } from "date-fns";
import { createServerAction } from "zsa";
import { auth } from "../auth/auth";
import { authedProcedure } from "../zsa-procedure";
import { sendTransferLinkEmailAction } from "./email";


export const getUploadPresignedUrlAction = createServerAction()
    .input(UploadPresignedUrlSchema).
    output(PreSignedUrlResponseSchema)
    .handler(async ({ input }) => {
        const { file_storage_key, file_type, user_id } = input;
        try {
            const putObjectCommand = new PutObjectCommand({
                Bucket: 'circulate-dev-env',
                Key: file_storage_key,
                ContentType: file_type,
                Metadata: {
                    ...(user_id && { user_id })
                },
            });
            const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 60 });
            return {
                success: true,
                message: 'Successfully Generated Presigned URL',
                data: { url }
            }
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error("An internal server error occurred. Please try again later.");
        }
    });

export const getDownloadPresignedUrlAction = createServerAction()
    .input(DownloadPresignedUrlSchema)
    .output(PreSignedUrlResponseSchema)
    .handler(async ({ input }) => {
        const { file_storage_key, file_type, file_extension, total_files, transfer_display_name } = input;
        try {
            const downloadFileName = generateDownloadFileName({
                file_storage_key,
                file_type,
                file_extension,
                total_files,
                transfer_display_name
            });
            const getObjectCommand = new GetObjectCommand({
                Bucket: "circulate-dev-env",
                Key: file_storage_key,
                ResponseContentDisposition: `attachment; filename="${downloadFileName}"`,
                ResponseContentType: file_type,
            });
            const url = await getSignedUrl(s3Client, getObjectCommand, {
                expiresIn: 60,
            });
            return {
                success: true,
                message: "Successfully Generated Presigned URL",
                data: { url },
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error("An internal server error occurred. Please try again later.");
        }
    });


export const addTransferLogAction = createServerAction()
    .input(AddTransferLogSchema)
    .output(AddTransferLogResponseSchema)
    .handler(async ({ input }) => {
        const session = await auth();
        const user_id = session?.user.id
        try {
            // Hash password if provided
            const hashedPassword = input.file_password
                ? await bcryptjs.hash(input.file_password, SALT_ROUND)
                : null;

            // Create transfer log in the database
            const addedTransferLog = await prisma.transfer.create({
                data: {
                    file_extension: input.file_extension,
                    file_storage_key: input.file_storage_key,
                    file_size: input.file_size,
                    file_type: input.file_type,
                    transfer_title: input.transfer_title,
                    expiration_date: input.expiration_date,
                    file_is_password_enabled: input.file_is_password_enabled,
                    file_password: hashedPassword,
                    max_downloads: input.max_downloads,
                    recipient_email: input.recipient_email,
                    total_files: input.total_files,
                    transfer_message: input.transfer_message,
                    transfer_mode: input.transfer_mode,
                    transfer_display_name: input.transfer_display_name,
                    user_id: user_id,
                }
            });

            let emailResponseMessage = "Transfer completed successfully.";

            // Handle email sending if the transfer mode is EMAIL_SEND
            if (addedTransferLog && input.transfer_mode === "EMAIL_SEND" && input.recipient_email) {
                const formattedSize = formatFileSize(input.file_size);
                const formattedExpiryDate = input.expiration_date
                    ? format(new Date(input.expiration_date), "PPpp")
                    : undefined;
                const downloadUrl = generateDownloadUrl(addedTransferLog.id);
                const [data, err] = await sendTransferLinkEmailAction({
                    senderName: input.transfer_display_name || 'Someone',
                    recipientEmail: input.recipient_email,
                    transferUrl: downloadUrl,
                    fileName: input.transfer_title,
                    fileSize: `${formattedSize.size}${formattedSize.abbreviation}`,
                    expiryDate: formattedExpiryDate
                });
                if (err) {
                    emailResponseMessage = `Transfer created successfully, but we failed to send the email. You can manually copy and share the transfer link. We apologize for the inconvenience.`;
                } else {
                    emailResponseMessage = `Transfer completed successfully. The transfer link has been sent via email to ${input.recipient_email}.`;
                }
            }
            return {
                message: emailResponseMessage,
                success: true,
                data: {
                    id: addedTransferLog.id
                }
            };
        } catch (error: any) {
            console.log(error, "error")
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error("An internal server error occurred. Please try again later.");
        }
    });


export const verifyTransferPasswordAction = createServerAction()
    .input(VerifyTransferPasswordSchema)
    .output(VerifyTransferPasswordResponseSchema)
    .handler(async ({ input }) => {
        try {
            const { id, password } = input;

            const transferLog = await prisma.transfer.findFirst({
                where: { id },
                select: { file_password: true, file_storage_key: true },
            });
            if (!transferLog) {
                throw new AppError("Transfer record not found. Please check the transfer ID.");
            }
            if (!transferLog.file_password!) return {
                success: true,
                message: "Password verified successfully. Access granted.",
                data: {
                    fileStorageKey: transferLog.file_storage_key,
                },
            };
            const isPasswordCorrect = await bcryptjs.compare(password, transferLog.file_password);
            if (!isPasswordCorrect) {
                throw new AppError("Incorrect password. Please try again.");
            }
            return {
                success: true,
                message: "Password verified successfully. Access granted.",
                data: {
                    fileStorageKey: transferLog.file_storage_key,
                },
            };
        } catch (error) {
            console.log(error, "error")
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error("An internal server error occurred. Please try again later.");
        }
    });

export const updateTransferMetricsAction = authedProcedure.createServerAction()
    .input(UpdateTransferMatricsSchema)
    .handler(async ({ input, ctx }) => {
        const { fileSize } = input
        const { id } = ctx.session.user
        try {
            const existingTransferMetrics = await prisma.transferMetrics.findUnique({
                where: { user_id: id }
            })
            const currentDate = new Date()
            if (existingTransferMetrics) {
                await prisma.transferMetrics.update({
                    where: { user_id: id },
                    data: {
                        total_transfers_size: { increment: fileSize },
                        total_transfers_count: { increment: 1 },
                        last_transfer_date: currentDate,
                        active_transfers_count: { increment: 1 }
                    }
                })
            } else {
                await prisma.transferMetrics.create({
                    data: {
                        user_id: id,
                        last_transfer_date: currentDate,
                        total_transfers_size: fileSize,
                        total_transfers_count: 1,
                        active_transfers_count: 1,
                        expired_transfers_count: 0
                    }
                })
            }
        } catch (error) {
            console.error('Error updating transfer metrics:', error)
            // throw error 
        }
    })