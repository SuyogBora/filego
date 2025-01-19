"use client";

import TinyLoader from "@/components/common/tiny-loader";
import { Button } from "@/components/ui/button";
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
import { ForgotPasswordFormSchema } from "@/lib/schema-validations/auth";
import { ForgotPasswordFormValue } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
    const { toast } = useToast();
    const [isPending, setIsPending] = useState(false);

    const form = useForm<ForgotPasswordFormValue>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordFormValue) => {
       
    };

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...field}
                                    autoComplete="email"
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