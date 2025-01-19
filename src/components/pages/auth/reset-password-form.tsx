"use client";

import TinyLoader from "@/components/common/tiny-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { ResetPasswordFormSchema } from "@/lib/schema-validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordFormValue } from "@/types/auth";

function ResetPasswordContent() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const [isPending, setIsPending] = useState(false);

    const form = useForm<ResetPasswordFormValue>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ResetPasswordFormValue) => {
        // setIsPending(true);
        // const { error } = await authClient.resetPassword({
        //     newPassword: data.password,
        // });
        // if (error) {
        //     toast({
        //         title: "Error",
        //         description: error.message,
        //         variant: "destructive",
        //     });
        // } else {
        //     toast({
        //         title: "Success",
        //         description: "Password reset successful. Login to continue.",
        //     });
        //     router.push("/auth/login");
        // }
        // setIsPending(false);
    };

    if (error === "invalid_token") {
        return (
            <div className="grow flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-gray-800">
                            Invalid Reset Link
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-center text-gray-600">
                                This password reset link is invalid or has expired.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your new password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm your new password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
}

export default function ResetPassword() {
    return (
        <Suspense>
            <ResetPasswordContent />
        </Suspense>
    );
}