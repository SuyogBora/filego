"use client";

import { authClient } from '@/lib/auth/auth-client';
import { Button } from '@/components/ui/button';
import { assert } from 'console';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface LogoutButtonProps {
}

const LogoutButton: FC<LogoutButtonProps> = ({ }) => {
    const router = useRouter()
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login");
                },
            },
        });
    }
    return (
        <Button onClick={handleLogout} className="cursor-default select-none  gap-2 rounded-sm px-2 justify-start py-1.5 h-auto text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground w-full" variant={"ghost"}>
            <LogOut />
            <span>Log out</span>
        </Button>
    )
}

export default LogoutButton