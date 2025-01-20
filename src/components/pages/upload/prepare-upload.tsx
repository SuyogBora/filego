"use client";

import { useFileUploadContext } from '@/lib/context/upload-context';
import { getTotalFileSize } from '@/lib/utils';
import { FC } from 'react';
import MiniFileDropzone from './mini-dropzone';
import SelectedFilesTable from './selected-files-table';
import UploadActions from './upload-actions';

interface PrepareUploadProps {}

const PrepareUpload: FC<PrepareUploadProps> = ({ }) => {
    const { mutationFuncs: { addFilesToQueue } } = useFileUploadContext();
    const {state:{files},mutationFuncs:{removeFileFromQueue}} = useFileUploadContext()
    return (
        <div className="mx-auto flex flex-col text-center gap-4 md:max-w-[800px]">
            <div className="space-y-2">
                  <h3 className='font-bold text-lg'>Prepare Your File Transfer</h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium leading-[1.8]">
                    Drag and drop files or use the browse button. For folders, please zip them first - 
                    we're working on an optimized folder upload feature coming soon!
                  </p>
            </div>
            <MiniFileDropzone onAddFiles={addFilesToQueue}/>
            {files.length > 0 && <UploadActions totalFilesSize={getTotalFileSize(files)}/>}
            <SelectedFilesTable files={files} onRemoveFile={removeFileFromQueue}/>
        </div>
    )
}

export default PrepareUpload