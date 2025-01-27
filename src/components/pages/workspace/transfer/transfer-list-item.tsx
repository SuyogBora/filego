import { Button } from '@/components/ui/button';
import { ChartArea, Copy, FileIcon, Info, QrCode, Trash } from 'lucide-react';
import { FC } from 'react';


interface TransferListItemProps {
    fileName: string;
    description: string;
    size: string;
    type: string;
}

const TransferListItem: FC<TransferListItemProps> = ({
    fileName,
    description,
    size,
    type
}) => {
    return (
        <li className="border border-border p-4 rounded-sm flex items-center justify-between">
            <div className="flex items-start gap-2">
                <div className="w-10 h-10 border-border border rounded-full flex items-center justify-center">
                    <FileIcon className='w-5 h-5' />
                </div>
                <div className="">
                    <h3 className='font-semibold mb-0.5'>{fileName}</h3>
                    <p className='text-xs text-muted-foreground mb-1'>{description}</p>
                    <div className="">
                        <ul className="flex items-center gap-2">
                            <li className="text-[10px] font-medium text-muted-foreground">
                                <span>Size</span>
                                <span>-</span>
                                <span>{size}</span>
                            </li>
                            <li className="text-[10px] font-medium text-muted-foreground">
                                <span>Type</span>
                                <span>-</span>
                                <span>{type}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="gap-1 flex items-center ">
                <Button tooltip="Copy File Link" variant={"outline"} size={"icon"} className='w-8 h-8 border border-white/10'><Copy className='!size-4'/></Button>
                <Button tooltip="Generate QR Code" variant={"outline"} size={"icon"} className='w-8 h-8 border border-white/10'><QrCode className='!size-4'/></Button>
                <Button tooltip="File Details" variant={"outline"} size={"icon"} className='w-8 h-8 border border-white/10'><Info className='!size-4'/></Button>
                <Button tooltip="File Analytics" variant={"outline"} size={"icon"} className='w-8 h-8 border border-white/10'><ChartArea className='!size-4'/></Button>
                <Button tooltip="Remove" variant={"outline"} size={"icon"} className='w-8 h-8 border border-white/10'><Trash className='!size-4 text-destructive'/></Button>
            </div>
        </li>
    )
}

export default TransferListItem