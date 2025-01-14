"use client";

import { useFileUploadContext } from '@/lib/context/upload-context';
import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';
import { useDropzone } from 'react-dropzone';

interface MegaFileDropzoneProps extends PropsWithChildren {
    className?: string;
}

const MegaFileDropzone: FC<MegaFileDropzoneProps> = ({ children, className }) => {
    const { mutationFuncs: { handleAddFiles } } = useFileUploadContext()
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleAddFiles, noClick: true });
    return (
        <div
            {...getRootProps()}
            className={cn("relative", className)}
        >
            <div className="">
                {
                    isDragActive && (
                        <div className="backdrop z-50 absolute top-0 left-0 w-full h-full bg-input flex items-center justify-center">
                            <h2 className='text-center text-primary'>Drop The Files Here</h2>
                        </div>)
                }
                <input {...getInputProps()} className="hidden" />
            </div>
            {children}
        </div>
    );
};

export default MegaFileDropzone;
