"use server";

import { PasswordResetEmail } from '@/components/emails/password-reset-email';
import { TransferLinkEmail } from '@/components/emails/transfer-link-email';
import { VerificationEmail } from '@/components/emails/verification-email';
import { resend } from '@/lib/resend';
import { EmailResponseSchema, PasswordResetEmailSchema, TransferLinkEmailSchema, VerificationEmailSchema } from "@/lib/schema-validations/email";
import { render } from '@react-email/components';
import { createServerAction } from "zsa";

const SENDER_EMAIL = process.env.SENDER_EMAIL as string;

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