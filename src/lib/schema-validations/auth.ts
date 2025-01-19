import { object, string, z } from "zod";
import { baseResponseSchemaObj } from "./common";

const getPasswordSchema = (type: "password" | "confirmPassword") =>
  string({ required_error: `${type} is required` })
    .min(8, `${type} must be atleast 8 characters`)
    .max(32, `${type} can not exceed 32 characters`);

const getEmailSchema = () =>
  string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email");

const getNameSchema = () =>
  string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters");

export const SignUpFormSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignInFormSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
});

export const ForgotPasswordFormSchema = object({
  email: getEmailSchema(),
});

export const ResetPasswordFormSchema = object({
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });


/// reponse schema

export const SignUpResponseSchema = z.object({
        ...baseResponseSchemaObj,
        data:z.object({
            name:z.string().nullable(),
            email:z.string().nullable(),
            id: z.string(),
        })
    })