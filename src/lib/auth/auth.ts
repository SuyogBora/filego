import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { openAPI } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendPasswordResetEmail, sendVerificationEmail } from "../actions/email";

export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    database: prismaAdapter(prisma, {
        provider: "mongodb"
    }),
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    },
    plugins: [openAPI(), nextCookies()],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url }) => {
            await sendPasswordResetEmail({
                email: user.email,
                name: user.name || 'User',
                resetUrl: url,
            });
        },
    },
    // emailVerification: {
    //     sendOnSignUp: false,
    //     autoSignInAfterVerification: false,
    //     sendVerificationEmail: async ({ user, token }) => {
    //         const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
    //         await sendVerificationEmail({
    //             email: user.email,
    //             name: user.name || 'User',
    //             verificationUrl,
    //         });
    //     },
    // }
} satisfies BetterAuthOptions) 