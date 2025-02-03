"use server";

import { SALT_ROUND } from "@/lib/constants";
import { AppError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { s3Client } from "@/lib/s3";
import { VerifyTransferPasswordResponseSchema, VerifyTransferPasswordSchema } from "@/lib/schema-validations/download";
import { AddTransferLogResponseSchema, AddTransferLogSchema, DeleteTransferLogResponseSchema, DeleteTransferLogSchema, DownloadPresignedUrlSchema, PreSignedUrlResponseSchema, UpdateTransferMetricsSchema, UploadPresignedUrlSchema } from "@/lib/schema-validations/transfer";
import { formatFileSize, generateDownloadFileName, generateDownloadUrl } from "@/lib/utils";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import bcryptjs from "bcryptjs";
import { format } from "date-fns";
import { createServerAction } from "zsa";
import { auth } from "../auth/auth";
import { authedProcedure } from "../zsa-procedure";
import { sendTransferLinkEmailAction } from "./email";
import { revalidatePath, revalidateTag } from "next/cache";


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
            revalidatePath("/workspace/transfer")
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

    export const updateTransferMetricsAction = authedProcedure
    .createServerAction()
    .input(UpdateTransferMetricsSchema)
    .handler(async ({ input, ctx }) => {
      const { fileSize, action } = input
      const { id: userId } = ctx.session.user
      const currentDate = new Date()
  
      try {
        const existingTransferMetrics = await prisma.transferMetrics.findUnique({
          where: { user_id: userId },
        })
  
        if (existingTransferMetrics) {
          if (action === "fileUploaded") {
            await prisma.transferMetrics.update({
              where: { user_id: userId },
              data: {
                total_transfers_size: { increment: fileSize },
                total_transfers_count: { increment: 1 },
                last_transfer_date: currentDate,
                active_transfers_count: { increment: 1 },
              },
            })
          } else if (action === "fileDeleted") {
            await prisma.transferMetrics.update({
              where: { user_id: userId },
              data: {
                active_transfers_count: { decrement: 1 },
              },
            })
          }
        } else if (action === "fileUploaded") {
          await prisma.transferMetrics.create({
            data: {
              user_id: userId,
              last_transfer_date: currentDate,
              total_transfers_size: fileSize,
              total_transfers_count: 1,
              active_transfers_count: 1,
              expired_transfers_count: 0,
            },
          })
        }
  
        // Revalidate the transfer-metrics tag
        revalidateTag("transfer-metrics")
  
        return { success: true }
      } catch (error) {
        console.error("Error updating transfer metrics:", error)
        return { success: false, error: "Failed to update transfer metrics" }
      }
    })
  
export const deleteTransferLogAction = authedProcedure.createServerAction()
    .input(DeleteTransferLogSchema)
    .output(DeleteTransferLogResponseSchema)
    .handler(async ({ input, ctx }) => {
        const { id } = input;
        const { id: userId } = ctx.session.user;

        try {
            // 1. Verify transfer exists and user has permission
            const existingTransfer = await prisma.transfer.findUnique({
                where: { id },
                select: {
                    id: true,
                    file_storage_key: true,
                    user_id: true
                }
            });

            if (!existingTransfer) {
                throw new AppError("Transfer log not found");
            }

            // Optional: Check if user owns the transfer
            if (existingTransfer.user_id !== userId) {
                throw new AppError("Unauthorized to delete this transfer");
            }

            // 2. Delete from S3 first (if this fails, we don't want orphaned files)
            try {
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: 'circulate-dev-env',
                    Key: existingTransfer.file_storage_key
                }));
            } catch (s3Error) {
                console.error('S3 deletion failed:', s3Error);
                throw new AppError(
                    "Failed to delete file from storage",
                );
            }

            // 3. Delete from database
            const deletedTransfer = await prisma.transfer.delete({
                where: { id },
                select: { id: true }
            });

            // 4. Return success response
            revalidatePath("/workspace/transfer")
            return {
                success: true,
                message: "Transfer and associated files have been deleted successfully",
                data: {
                    id: deletedTransfer.id
                }
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new Error("An internal server error occurred. Please try again later.");
        }
    });