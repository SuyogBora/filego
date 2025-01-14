"use server";

import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "../schema-validations/auth";
import { baseProcedure } from "../zsa-procedure";

export const credentialLoginAction = baseProcedure.createServerAction()
    .input(signInSchema)
    .handler(async ({ input, ctx }) => {
        const { authService } = ctx
        const data = await authService.credentialLogin(input)
        if (!data) {
            throw new Error("Failed to Login");
        }
        redirect("/")
    });


export const credentialRegisterAction = baseProcedure.createServerAction()
    .input(signUpSchema)
    .handler(async ({ input, ctx }) => {
        const { authService } = ctx
        const data = await authService.credentialRegister(input)
        if (!data) {
            throw new Error("Failed to register user");
        }
        redirect('/auth/login')
    });
