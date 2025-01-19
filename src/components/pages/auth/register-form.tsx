"use client";

import TinyLoader from "@/components/common/tiny-loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpAction } from "@/lib/actions/auth";
import { useToast } from "@/lib/hooks/use-toast";
import { SignUpFormSchema } from "@/lib/schema-validations/auth";
import { SignUpFormValue } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

const RegisterForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { isPending, execute: signUpExecute } = useServerAction(signUpAction);

    const form = useForm<SignUpFormValue>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    async function onSubmit(values: SignUpFormValue) {
        const [data, error] = await signUpExecute(values);
        if (error) {
            toast({
                variant: "destructive",
                title: "Registration failed",
                description: error.message
            });
            return;
        }
        toast({
            title: "Registration successful",
            description: "Please sign in with your new account",
        });
        form.reset();
        router.push('/auth/login');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {["name", "email", "password", "confirmPassword"].map((field) => (
                    <FormField
                        control={form.control}
                        key={field}
                        name={field as keyof SignUpFormValue}
                        render={({ field: fieldProps }) => (
                            <FormItem>
                                <FormLabel>
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
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
                                        placeholder={`Enter your ${field.charAt(0).toLowerCase() + field.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()}`}
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
                    {isPending ? <TinyLoader /> : "Register"}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;