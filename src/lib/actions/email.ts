"use server";
import { z } from "zod";
import { createServerAction } from "zsa";
import { PasswordResetEmail } from '@/components/emails/password-reset-email';
import { VerificationEmail } from '@/components/emails/verification-email';
import { TransferLinkEmail } from '@/components/emails/transfer-link-email';
import { render } from '@react-email/components';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL = process.env.SENDER_EMAIL as string;

// Schema for password reset email input
const PasswordResetEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  resetUrl: z.string().url("Invalid reset URL")
});

// Schema for verification email input
const VerificationEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  verificationUrl: z.string().url("Invalid verification URL")
});

// Schema for transfer link email input
const TransferLinkEmailSchema = z.object({
  senderName: z.string().min(1, "Sender name is required"),
  recipientEmail: z.string().email("Invalid recipient email address"),
  transferUrl: z.string().url("Invalid transfer URL"),
  fileName: z.string().min(1, "File name is required"),
  fileSize: z.string().optional(),
  expiryDate: z.string().optional()
});

// Common response schema for all email actions
const EmailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional()
});

export const sendPasswordResetEmailAction = createServerAction()
  .input(PasswordResetEmailSchema)
  .output(EmailResponseSchema)
  .handler(async ({ input }) => {
    const { email, name, resetUrl } = input;
    
    try {
      const emailHtml = await render(
        PasswordResetEmail({
          userFirstName: name,
          resetPasswordUrl: resetUrl,
        }), 
        { pretty: true }
      );
      const { data, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: email,
        subject: 'Reset Your Password',
        html: emailHtml,
      });
      if (error) {
        throw new Error("Failed to send password reset email");
      }
      return {
        success: true,
        message: "Password reset email sent successfully",
        data
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to send password reset email");
    }
  });

export const sendVerificationEmailAction = createServerAction()
  .input(VerificationEmailSchema)
  .output(EmailResponseSchema)
  .handler(async ({ input }) => {
    const { email, name, verificationUrl } = input;
    
    try {
      const emailHtml = await render(
        VerificationEmail({
          userFirstName: name,
          verificationUrl: verificationUrl,
        }), 
        { pretty: true }
      );
      const { data, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: email,
        subject: 'Verify Your Email Address',
        html: emailHtml,
      });
      if (error) {
        throw new Error("Failed to send verification email");
      }
      return {
        success: true,
        message: "Verification email sent successfully",
        data
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to send verification email");
    }
  });

export const sendTransferLinkEmailAction = createServerAction()
  .input(TransferLinkEmailSchema)
  .output(EmailResponseSchema)
  .handler(async ({ input }) => {
    const { senderName, recipientEmail, transferUrl, fileName, fileSize, expiryDate } = input;
    
    try {
      const emailHtml = await render(
        TransferLinkEmail({
          senderName,
          transferUrl,
          fileName,
          fileSize,
          expiryDate,
        }), 
        { pretty: true }
      );
      const { data, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: recipientEmail,
        subject: `${senderName} shared a file with you: ${fileName}`,
        html: emailHtml,
      });
      if (error) {
        throw new Error("Failed to send transfer link email");
      }
      return {
        success: true,
        message: "Transfer link email sent successfully",
        data
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to send transfer link email");
    }
  });