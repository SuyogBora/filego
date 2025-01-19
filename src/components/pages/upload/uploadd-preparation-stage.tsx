"use client";

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { TransferModeType } from '@/lib/constants';
import { TransferFormSchema } from '@/lib/schema-validations/transfer';
import { TransferFormValue } from '@/types/transfer';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface UploadPreparationStageProps {
    onCancle: () => void,
    onSave: (values: TransferFormValue) => void,
    transferMode: TransferModeType,
    transferTitle: string
}

const UploadPreparationStage: FC<UploadPreparationStageProps> = ({ onCancle, onSave, transferMode, transferTitle }) => {
    const form = useForm<TransferFormValue>({
        resolver: zodResolver(TransferFormSchema),
        values: {
            file_is_password_enabled: false,
            transfer_mode: transferMode,
            transfer_title: transferTitle,
            file_password: "",
            recipient_email: "",
            transfer_message: ""
        }
    });
    const watchTransferMode = form.watch("transfer_mode");
    const watchPasswordEnabled = form.watch("file_is_password_enabled");

    const handleSubmit = (data: TransferFormValue) => {
        onSave(data)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="transfer_title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Transfer Name</FormLabel>
                                <FormControl>
                                    <Input className="text-xs" placeholder="Enter transfer name" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="transfer_message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Transfer Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="text-xs"
                                        placeholder="Add an optional message"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="file_is_password_enabled"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-sm">Enable Password</FormLabel>
                                    <Switch size="small" checked={field.value} onCheckedChange={field.onChange} />
                                </div>
                            </FormItem>
                        )}
                    />
                    {watchPasswordEnabled && (
                        <FormField
                            control={form.control}
                            name="file_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='password' className="text-xs" placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="transfer_mode"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Select Transfer Mode</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex max-sm:flex-col max-sm:space-y-2 sm:space-x-8 flex-row py-3 px-4 bg-muted rounded-md"
                                    >
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="MANUAL_SEND" />
                                            </FormControl>
                                            <FormLabel>Get Transfer Link</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="EMAIL_SEND" />
                                            </FormControl>
                                            <FormLabel>Send Link via Email</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {watchTransferMode === "EMAIL_SEND" && (
                        <FormField
                            control={form.control}
                            name="recipient_email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Recipient Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-xs"
                                            placeholder="Enter recipient email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    )}
                </div>
                <DialogFooter className="grid grid-cols-2 gap-2 mt-6">
                    <Button type="button" variant="destructive" className="w-full" onClick={onCancle} >Cancel</Button>
                    <Button type="submit" className="w-full">Save and Continue</Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default UploadPreparationStage;

