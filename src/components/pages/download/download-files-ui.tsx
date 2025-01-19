"use client";

import TinyLoader from "@/components/common/tiny-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getDownloadPresignedUrlAction, verifyTransferPasswordAction } from "@/lib/actions/transfer";
import { useToast } from "@/lib/hooks/use-toast";
import { VerifyPasswordFormSchema } from "@/lib/schema-validations/download";
import { VerifyPasswordFormValue } from "@/types/download";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Transfer as ITransfer } from '@prisma/client';
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

interface DownloadTransferFilesUIProps {
    transferLog: ITransfer;
}

const DownloadTransferFilesUI: FC<DownloadTransferFilesUIProps> = ({ transferLog }) => {
    const [isPasswordEnabled, setIsPasswordEnabled] = useState<boolean>(transferLog.file_is_password_enabled);
    const [fileStorageKey, setFileStorageKey] = useState<string>(transferLog.file_storage_key);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    const { isPending, execute: verifyPasswordExecute } = useServerAction(verifyTransferPasswordAction);
    const { toast } = useToast();
    const downloadAnchorRef = useRef<HTMLAnchorElement>(null);
    // Set up the form with Zod validation
    const form = useForm<VerifyPasswordFormValue>({
        resolver: zodResolver(VerifyPasswordFormSchema),
        defaultValues: { password: "" },
    });

    useEffect(() => {
        if (!isPasswordEnabled && fileStorageKey) {
            (async () => {
                const [data, err] = await getDownloadPresignedUrlAction({
                    file_storage_key: fileStorageKey,
                    file_type: transferLog.file_type,
                    file_extension: transferLog.file_extension,
                    total_files: transferLog.total_files,
                    transfer_display_name: transferLog.transfer_display_name
                });

                if (err) {
                    toast({
                        title: "Error",
                        description: "Unable to process file details. Please try again.",
                        variant: "destructive",
                    });
                    return;
                }
                setDownloadURL(data.data.url);
            })();
        }
    }, [isPasswordEnabled, fileStorageKey]);

    // Handle password submission
    const handlePasswordSubmit = async (values: VerifyPasswordFormValue) => {
        const [data, err] = await verifyPasswordExecute({
            id: transferLog.id,
            password: values.password,
        });
        if (err) {
            toast({
                title: err.message,
                description: "Unable to process file details. Please try again.",
                variant: "destructive",
            });
            return;
        }
        setIsPasswordEnabled(false);
        setFileStorageKey(data.data?.fileStorageKey);
        toast({
            title: 'Password Verification Successfull!!',
            description: "You Can Download The File, Now",
            variant: "default",
        });
    };

    const handleDownload = () => {
        if (downloadURL && downloadAnchorRef.current) {
            downloadAnchorRef.current.href = downloadURL;
            downloadAnchorRef.current.download = transferLog.transfer_title;
            downloadAnchorRef.current.click();
        } else {
            toast({
                title: "Download URL Not Available",
                description: "Unable to process file details. Please try again.",
                variant: "destructive",
            });
        }
    };

    const cardTitles = {
        default: {
            title: "Download Transferred File",
            description: "You can download the file.",
        },
        password: {
            title: "Enter Password",
            description: "This file is password protected. Please enter the password to proceed.",
        },
    };

    const currentCardTitle = isPasswordEnabled ? cardTitles.password : cardTitles.default;

    return (
        <>
            <a
                ref={downloadAnchorRef}
                className="hidden"
                aria-hidden="true"
            />
            <Card className="sm:max-w-[425px] border-border w-full">
                <CardHeader>
                    <CardTitle className="mb-0.5">{currentCardTitle.title}</CardTitle>
                    <CardDescription className="text-xs leading-[1.5]">
                        {currentCardTitle.description}
                    </CardDescription>
                </CardHeader>
                {isPasswordEnabled ? (
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handlePasswordSubmit)}
                                className="space-y-3"
                            >
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="text-xs"
                                                    placeholder="Enter password"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    {isPending ? <TinyLoader /> : "Verify Password"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                ) : (
                    <>
                        <CardContent>
                            <div className="mb-5">
                                <h4 className="text-sm mb-1 font-semibold">Title</h4>
                                <p className="text-xs text-muted-foreground">
                                    {transferLog.transfer_title}
                                </p>
                            </div>
                            <div className="mb-5">
                                <h4 className="text-sm mb-1 font-semibold">File Count</h4>
                                <p className="text-xs text-muted-foreground">{transferLog.total_files}</p>
                            </div>
                            {transferLog.transfer_message && (
                                <div className="mb-5">
                                    <h4 className="text-sm mb-1 font-semibold">Message</h4>
                                    <p className="text-xs text-muted-foreground">
                                        {transferLog.transfer_message}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                onClick={handleDownload}
                                disabled={!downloadURL}
                            >
                                Download Files
                            </Button>
                        </CardFooter>
                    </>
                )}
            </Card>
        </>
    );
};

export default DownloadTransferFilesUI;
