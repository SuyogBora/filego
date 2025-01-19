import { ForgotPasswordFormSchema, ResetPasswordFormSchema, SignInFormSchema, SignUpFormSchema } from "@/lib/schema-validations/auth";
import { z } from "zod";

export type ResetPasswordFormValue= z.infer<typeof ResetPasswordFormSchema>
export type SignInFormValue= z.infer<typeof SignInFormSchema>
export type ForgotPasswordFormValue= z.infer<typeof ForgotPasswordFormSchema>
export type SignUpFormValue= z.infer<typeof SignUpFormSchema>
