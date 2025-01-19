"use server";

import { signIn, signOut } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { SignInFormSchema, SignUpFormSchema, SignUpResponseSchema } from "@/lib/schema-validations/auth";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { createServerAction } from "zsa";
import { baseResponseSchemaObj } from "../schema-validations/common";

export const signUpAction = createServerAction()
    .input(SignUpFormSchema)
    .output(SignUpResponseSchema)
    .handler(async ({ input }) => {
        const { email, name, password } = input;
        try {
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                throw new Error("An account with this email already exists");
            }
            const hashedPassword = await bcryptjs.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: false
                }
            });
            return {
                success: true,
                message: 'Account created successfully',
                data: user
            };
        } catch (error) {
            throw new Error("An internal server error occurred. Please try again later.");
        }
    });

export const signInAction = createServerAction()
    .input(SignInFormSchema)
    .output(z.object(baseResponseSchemaObj))
    .handler(async ({ input }) => {
        const { email, password } = input;
        try {
            await signIn("credentials", {
                email,
                password,
                redirectTo: "/"
            });
            return {
                success: true,
                message: 'Signed in successfully'
            };
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        throw new Error('Invalid credentials');
                    default:
                        throw new Error('Something went wrong.');
                }
            }
            throw error;
        }
    });

export const socialAuthAction = createServerAction()
    .input(z.object({
        provider: z.enum(["github", "google"])
    }))
    .output(z.object(baseResponseSchemaObj))
    .handler(async ({ input }) => {
        const { provider } = input;
        try {
            await signIn(provider, {
                redirectTo: "/"
            });
            return {
                success: true,
                message: `${provider} sign in successful`
            };
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'OAuthSignInError':
                        throw new Error(`${provider} sign in failed`);
                    case 'OAuthCallbackError':
                        throw new Error(`${provider} callback error`);
                    case 'OAuthAccountNotLinked':
                        throw new Error(`You Already Have Account Registered With This Email, Try To Login With Credentials`);
                    default:
                        throw new Error("An internal server error occurred. Please try again later.");
                }
            }
            throw error;
        }
    });

export const signOutAction = createServerAction()
    .output(z.object(baseResponseSchemaObj))
    .handler(async () => {
        await signOut({ redirectTo: "/auth/login" });
        return {
            success: true,
            message: 'Signed out successfully'
        };
    });