import { Button } from '@/components/ui/button'
import { formatFileSize, getIcon } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'

interface SelectedFileListItemProps {
    file: File,
    onRemoveFile: (fileName: string) => void
}

const SelectedFileListItem: FC<SelectedFileListItemProps> = ({ file, onRemoveFile }) => {
    const { abbreviation, size } = formatFileSize(file.size)
    return (
        <li className="bg-background border-border border p-2 rounded-sm flex items-start justify-between gap-1 text-start">
            <div className="flex-grow flex items-center gap-1 overflow-hidden">
                <div className="w-8 h-8 border border-muted-foreground/20 rounded-full flex-shrink-0 flex items-center justify-center bg-secondary">
                      {getIcon(file.type,"","size-5")}
                </div>
                <div className="overflow-hidden">
                    <h4 className="text-xs md:text-sm font-semibold mb-1 truncate">{file.name}</h4>
                    <div className="">
                        <ul className="flex items-center gap-2">
                            <li className="text-[10px] md:text-xs font-medium text-muted-foreground">
                                <span>Size</span>
                                <span>-</span>
                                <span>{size}{abbreviation}</span>
                            </li>
                            <li className="text-[10px] md:text-xs font-medium text-muted-foreground">
                                <span>Type</span>
                                <span>-</span>
                                <span>{file.type}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Button
               tooltip='Remove'
                variant="outline"
                size="icon"
                className='w-6 h-6 flex-shrink-0 text-red-500 hover:bg-destructive hover:text-white'
                onClick={() => onRemoveFile(file.name)}
            >
                <Trash2 className='!size-3' />
            </Button>
        </li>
    )
}

export default SelectedFileListItem