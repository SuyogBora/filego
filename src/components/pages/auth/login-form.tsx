"use client";

import TinyLoader from "@/components/common/tiny-loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/lib/actions/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { SignInFormSchema } from "@/lib/schema-validations/auth";
import { SignInFormValue } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

const LoginForm = () => {
    const { toast } = useToast();
    const { isPending, execute: signInExecute } = useServerAction(signInAction);

    const form = useForm<SignInFormValue>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    async function onSubmit(values: SignInFormValue) {
        const [data, error] = await signInExecute(values);
        if (error) {
            toast({
                variant: "destructive",
                title: "Login failed",
                description: error.message
            });
            return;
        }
        toast({
            title: "Login successful",
            description: data.message,
        });
        form.reset();
        // router.push('/'); // or wherever you want to redirect after login
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {["email", "password"].map((field) => (
                    <FormField
                        control={form.control}
                        key={field}
                        name={field as keyof SignInFormValue}
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
                                            <Link 
                                                className="text-xs font-semibold underline" 
                                                href={"/auth/forgot-password"}
                                            >
                                                Forgot Password
                                            </Link>
                                        </div>
                                }
                                <FormControl>
                                    <Input
                                        type={field === "password" ? "password" : "email"}
                                        placeholder={`Enter your ${field}`}
                                        {...fieldProps}
                                        autoComplete="off"
                                        disabled={isPending}
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