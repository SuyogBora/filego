"use client";

import { authClient } from "@/lib/auth/auth-client";
import TinyLoader from "@/components/common/tiny-loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/lib/schema-validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
            },
            {
                onRequest: () => {
                    setIsPending(true);
                },
                onSuccess: async () => {
                    router.push("/");
                },
                onError: (ctx) => {
                    const errorMessage = ctx.error?.message ?? "Something went wrong during login";
                    toast({
                        title: "Login failed",
                        description: errorMessage,
                        variant: "destructive"
                    });
                },
            }
        );
        setIsPending(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {["email", "password"].map((field) => (
                    <FormField
                        control={form.control}
                        key={field}
                        name={field as keyof z.infer<typeof signInSchema>}
                        render={({ field: fieldProps }) => (
                            <FormItem>
                                {
                                    field !== "password" ? (
                                        <FormLabel>
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </FormLabel>
                                    ) :
                                        <div className="flex items-center justify-between">
                                            <FormLabel>
                                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                            </FormLabel>
                                            <Link className="text-xs font-semibold underline" href={"/auth/forgot-password"}>Forgot Password</Link>
                                        </div>
                                }
                                <FormControl>
                                    <Input
                                        type={field === "password" ? "password" : "email"}
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
                    {isPending ? <TinyLoader /> : "Login"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;