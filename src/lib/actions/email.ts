"use server";

import { PasswordResetEmail } from '@/components/emails/password-reset-email';
import { VerificationEmail } from '@/components/emails/verification-email';
import { render } from '@react-email/components';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER_EMAIL = process.env.SENDER_EMAIL as string

export async function sendPasswordResetEmail({
  email,
  name,
  resetUrl,
}: {
  email: string;
  name: string;
  resetUrl: string;
}) {
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
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return { success: false, error };
  }
}

export async function sendVerificationEmail({
  email,
  name,
  verificationUrl,
}: {
  email: string;
  name: string;
  verificationUrl: string;
}) {
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
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error };
  }
}