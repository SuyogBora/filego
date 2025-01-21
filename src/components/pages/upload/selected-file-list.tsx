import { cn } from '@/lib/utils'
import { FC } from 'react'
import SelectedFileListItem from './selected-file-list-item'

interface SelectedFileListProps {
    files: File[],
    onRemoveFile: (fileName: string) => void
}

const SelectedFileList: FC<SelectedFileListProps> = ({ files, onRemoveFile }) => {
    // trying event delegation for browsed file removal
    const handleListClick = (e: React.MouseEvent) => {
        const button = (e.target as HTMLElement).closest('button');
        if (!button) return;
        const fileName = button.dataset.filename;
        if (fileName) {
            onRemoveFile(fileName);
        }
    };
    return (
        <ul className={cn("flex flex-col gap-2")} onClick={handleListClick}>
            {
                files.map((file: File, index: number) => (
                    <SelectedFileListItem key={file.name} file={file} onRemoveFile={onRemoveFile} />
                ))
            }
        </ul>
    )
}

export default SelectedFileList