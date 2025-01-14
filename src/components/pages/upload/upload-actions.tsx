"use client";

import { Button } from '@/components/ui/button';
import { TransferMode } from '@/types/state';
import { Link2, Mail } from 'lucide-react';
import { FC, useState } from 'react';

interface UploadActionsProps {
    totalFilesSize:string
}

const UploadActions: FC<UploadActionsProps> = ({totalFilesSize}) => {
    const handleButtonClick = (mode: TransferMode) => {
    }
    return (
        <div className="flex items-center justify-between">
            <div className="border border-border font-semibold text-xs py-2 px-4 rounded-md bg-secondary flex items-center gap-2">
                <h5 className=''>Transfer Size</h5>
                <span className=' text-green-600'>{totalFilesSize}</span>
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={() => handleButtonClick(TransferMode.MANUAL_SEND)} className='text-xs py-2 h-auto' variant={"default"} size={"sm"}> <span><Link2 /></span> Get Transfer Link</Button>
                <Button onClick={() => handleButtonClick(TransferMode.EMAIL_SEND)} className='text-xs py-2 h-auto' variant={"default"} size={"sm"}> <span><Mail /></span> Send Via Email</Button>
            </div>
        </div>
    )
}

export default UploadActions