import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ClipboardButtonProps {
    className?: string;
    textToCopy: string;
    onCopied?: (coppiedText: string) => void;
    tooltipText?: string;
}

const ClipboardButton: FC<ClipboardButtonProps> = ({ textToCopy, onCopied, className,tooltipText }) => {
    return (
        <CopyToClipboard text={textToCopy} onCopy={() => {
            if (typeof onCopied === "function") {
                onCopied(textToCopy)
            }
        }
        }>
            <Button
                tooltip={tooltipText}
                className={cn('text-xs h-auto py-1.5 px-4 gap-2 border border-secondary', className)}
                variant="outline"
            >
              <span> <Copy className="w-4 h-4 flex-shrink-0" /></span> Copy
            </Button>
        </CopyToClipboard >
    );
};

export default ClipboardButton;
