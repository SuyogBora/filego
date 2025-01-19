"use client";

import IconFilesUpload from '@/components/icons/icon-file-upload';
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';

interface MiniFileDropzoneProps {
    onAddFiles:(files:File[])=>void
}

const MiniFileDropzone: FC<MiniFileDropzoneProps> = ({onAddFiles}) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop: onAddFiles});
    return (
        <div {...getRootProps()} className="border-border border hover:border-primary/50 duration-300 cursor-pointer rounded-sm md:rounded-md shadow-lg border-dashed h-[200px] md:h-[240px] p-6 flex items-center justify-center">
            <input {...getInputProps()} className="hidden" />
            <div className="flex items-center justify-center flex-col gap-2">
                <div className="">
                    <IconFilesUpload className='w-10 h-10' />
                </div>
                <h1 className='text-sm font-medium'>Click To Upload Or Drag And Drop</h1>
                <span className='text-[10px] text-muted-foreground'>(App Types Of File Are Acceptable)</span>
            </div>
        </div>
    )
}

export default MiniFileDropzone