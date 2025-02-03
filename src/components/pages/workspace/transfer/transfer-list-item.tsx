import ClipboardButton from '@/components/common/copy-clipboard-btn';
import { useToast } from '@/lib/hooks/use-toast';
import { formatFileSize, generateDownloadUrl, getIcon } from '@/lib/utils';
import { ActionHandler } from '@/types/transfer';
import { Transfer } from '@prisma/client';
import { format } from 'date-fns';
import { Info, Trash } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import ActionButton from './transfer-action-btn';
import MetadataItem from './transfer-metadata-item';

// Interface for the component props
interface TransferListItemProps {
    transfer: Transfer;
    onAction: ActionHandler;
}

/**
 * TransferListItem Component
 * 
 * Displays a single transfer item with file information and action buttons.
 * Includes file metadata like size, type, and expiration date along with
 * various action buttons for file management.
 */
const TransferListItem: FC<TransferListItemProps> = ({ transfer, onAction }) => {
    // Format the file size into human-readable format
    const { toast } = useToast();
    const { abbreviation, size } = formatFileSize(transfer.file_size);
    const downloadUrl = generateDownloadUrl(transfer.id);

    const handleCopyUrl = () => {
        toast({ title: "Transfer URL Copied" });
    };
    return (
        <li className="relative group">
            {/* File Information Section */}
            <Link href={`/workspace/transfer/${transfer.id}`} className="flex items-start gap-2 border  p-4 rounded-sm group-hover:bg-sidebar group-hover:dark:border-white/10 group-hover:border-black/10 duration-150">
                {/* File Icon */}
                <div className="w-10 h-10 border-border border rounded-full flex items-center justify-center">
                    {getIcon(transfer.file_type, "_", "size-5")}
                </div>
                {/* File Details */}
                <div>
                    <h3 className="text-sm font-semibold mb-0.5">{transfer.transfer_title}</h3>
                    <p className="text-[11px] text-muted-foreground mb-1">
                        {transfer.transfer_message}
                    </p>

                    {/* File Metadata */}
                    <div>
                        <ul className="flex items-center gap-2">
                            <MetadataItem
                                label="Size"
                                value={`${size}${abbreviation}`}
                            />
                            <MetadataItem
                                label="Type"
                                value={transfer.file_type}
                            />
                            <MetadataItem
                                label="Expire On"
                                value={format(transfer.expiration_date, "MMM dd, yyyy 'at' HH:mm")}
                                className="text-red-600"
                            />
                        </ul>
                    </div>
                </div>
            </Link>
            {/* Action Buttons Section */}
            <div className="absolute top-1/2 -translate-y-1/2 right-8 gap-1 flex items-center max-sm:hidden">
                <ClipboardButton
                    textToCopy={downloadUrl}
                    onCopied={handleCopyUrl}
                    iconOnly={true}
                    className='w-8 h-8 border border-white/10'
                    tooltipText="Copy File Link"
                />
                <ActionButton
                    icon={<Info />}
                    tooltip="File Details"
                    onClick={() => onAction({
                        type: 'details',
                        values: { transfer }
                    })}
                />
                <ActionButton
                    icon={<Trash />}
                    tooltip="Remove"
                    destructive
                    onClick={() => onAction({
                        type: 'delete',
                        values: {
                            transferId: transfer.id,
                        }
                    })}
                />
            </div>
        </li>
    );
};

export default TransferListItem;