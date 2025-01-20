import { cn } from '@/lib/utils'
import { FC } from 'react'
import SelectedFileListItem from './selected-file-list-item'

interface SelectedFileListProps {
    files: File[],
    onRemoveFile: (fileName: string) => void
}

const SelectedFileList: FC<SelectedFileListProps> = ({files,onRemoveFile}) => {
  return (
     <ul className={cn("flex flex-col gap-2")}>
         {
             files.map((file:File,index:number)=>(
                 <SelectedFileListItem key={file.name} file={file} onRemoveFile={onRemoveFile}/>
             ))
         }
     </ul>
  )
}

export default SelectedFileList