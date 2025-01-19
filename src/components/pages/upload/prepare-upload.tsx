"use client";

import { useFileUploadContext } from '@/lib/context/upload-context';
import { FC } from 'react';
import MiniFileDropzone from './mini-dropzone';
import SelectedFilesTable from './selected-files-table';
import UploadActions from './upload-actions';
import { getTotalFileSize } from '@/lib/utils';

interface PrepareUploadProps {}

const PrepareUpload: FC<PrepareUploadProps> = ({ }) => {
    const { mutationFuncs: { addFilesToQueue } } = useFileUploadContext();
    const {state:{files},mutationFuncs:{removeFileFromQueue}} = useFileUploadContext()
    return (
        <div className="mx-auto flex flex-col  text-center gap-4 md:max-w-[800px]">
            <MiniFileDropzone onAddFiles={addFilesToQueue}/>
            {files.length > 0 && <UploadActions totalFilesSize={getTotalFileSize(files)}/>}
            <SelectedFilesTable files={files} onRemoveFile={removeFileFromQueue}/>
        </div>
    )
}

export default PrepareUpload