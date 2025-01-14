"use client";

import { authClient } from "@/lib/auth/auth-client";
import TinyLoader from "@/components/common/tiny-loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/lib/schema-validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        await authClient.signUp.email(
            {
                email: values.email,
                password: values.password,
                name: values.name,
            },
            {
                onRequest: () => {
                    setIsPending(true);
                },
                onSuccess: () => {
                    toast({
						title: "Account created",
						description:
							"Your account has been created. Check your email for a verification link.",
					});
                },
                onError: (ctx) => {
                    const errorMessage = ctx.error?.message ?? "Something went wrong during registration";
                    toast({
						title: "Something went wrong",
						description: errorMessage,
					});
                },
            }
        );
        setIsPending(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {["name", "email", "password", "confirmPassword"].map((field) => (
                    <FormField
                        control={form.control}
                        key={field}
                        name={field as keyof z.infer<typeof signUpSchema>}
                        render={({ field: fieldProps }) => (
                            <FormItem>
                                <FormLabel>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type={
                                            field.toLowerCase().includes("password")
                                                ? "password"
                                                : field === "email"
                                                    ? "email"
                                                    : "text"
                                        }
                                        placeholder={`Enter your ${field}`}
                                        {...fieldProps}
                                        autoComplete="off"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    {isPending ? <TinyLoader /> : "Register"}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;