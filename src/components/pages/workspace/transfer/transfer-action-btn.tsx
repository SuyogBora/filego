import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import React, { FC, JSX } from "react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    icon: React.ReactNode;
    tooltip: string;
    destructive?: boolean;
}

const ActionButton: FC<ActionButtonProps> = ({ icon, tooltip, destructive = false, ...props }) => (
    <Button
        {...props}
        tooltip={tooltip}
        variant="outline"
        size="icon"
        className="w-8 h-8 border border-white/10"
    >
        {React.cloneElement(icon as JSX.Element, {
            className: `!size-4 ${destructive ? 'text-destructive' : ''}`
        })}
    </Button>
);

export default ActionButton
