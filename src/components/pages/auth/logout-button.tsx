"use client";

import TinyLoader from '@/components/common/tiny-loader';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/lib/actions/auth';
import { useToast } from '@/lib/hooks/use-toast';
import { LogOut } from 'lucide-react';
import { FC } from 'react';
import { useServerAction } from 'zsa-react';

interface LogoutButtonProps {
}

const LogoutButton: FC<LogoutButtonProps> = ({ }) => {
    const { toast } = useToast();
    const { isPending, execute: signOutExecute } = useServerAction(signOutAction);

    const handleLogout = async () => {
        const [data, error] = await signOutExecute()
        if (error) {
            toast({
                variant: "destructive",
                title: '"Failed to sign out. Please try again."',
            });
            return;
        }
        toast({
            title:data.message,
            variant: "default",
        });
    }
    return (
        <Button onClick={handleLogout} className="cursor-default select-none  gap-2 rounded-sm px-2 justify-start py-1.5 h-auto text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground w-full" variant={"ghost"}>
            {
                isPending ? <TinyLoader /> : (
                    <>
                        <LogOut />
                        <span>Log out</span>
                    </>
                )
            }
        </Button>
    )
}

export default LogoutButton