"use client";

import FileTrandsferDialog from '@/components/dialogs/file-transfer-dialog';
import { Button } from '@/components/ui/button';
import { TransferMode, TransferModeType } from '@/lib/constants';
import { IFormattedFileSize } from '@/types/transfer';
import { Link2, Mail } from 'lucide-react';
import { FC, useState } from 'react';


interface UploadActionsProps {
    totalFilesSize:IFormattedFileSize
}

const UploadActions: FC<UploadActionsProps> = ({ totalFilesSize }) => {
    const [openTransferDialog, setOpenTransferDialog] = useState<boolean>(false);
    const [choosedTransferMode, setChoosedTransferMode] = useState<TransferModeType>(TransferMode.MANUAL_SEND);

    const handleButtonClick = (mode: TransferModeType) => {
        setChoosedTransferMode(mode)
        setOpenTransferDialog(true)
    }

    return (
        <>
            <div className="flex items-start sm:items-center justify-between max-sm:flex-col gap-3">
                <div className="border border-border font-semibold text-xs py-2 px-4 rounded-sm sm:rounded-md bg-secondary flex items-center gap-2 max-sm:w-full max-sm:justify-center">
                    <h5 className=''>Transfer Size</h5>
                    <span className=' text-green-600'>{totalFilesSize.size}{totalFilesSize.abbreviation}</span>
                </div>
                <div className="flex items-center gap-2 max-sm:w-full">
                    <Button onClick={() => handleButtonClick(TransferMode.MANUAL_SEND)} className='text-xs py-2 h-auto max-sm:rounded-sm max-sm:w-full max-sm:flex-grow' variant={"default"} size={"sm"}> <span><Link2 /></span> Get Transfer Link</Button>
                    <Button onClick={() => handleButtonClick(TransferMode.EMAIL_SEND)} className='text-xs py-2 h-auto max-sm:rounded-sm max-sm:w-full max-sm:flex-grow' variant={"default"} size={"sm"}> <span><Mail /></span> Send Via Email</Button>
                </div>
            </div>
            <FileTrandsferDialog open={openTransferDialog} onClose={()=>setOpenTransferDialog(false)} transferMode={choosedTransferMode}/>
        </>
    )
}

export default UploadActions