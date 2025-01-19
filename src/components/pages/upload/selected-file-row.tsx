import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatFileSize, getIcon } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'

interface SelectedFilesTableRowProps {
    file: File,
    onRemoveFile: (fileName: string) => void
}

const SelectedFilesTableRow: FC<SelectedFilesTableRowProps> = ({file, onRemoveFile}) => {
    const {abbreviation,size} = formatFileSize(file.size)
    return (
        <TableRow className='border-border  text-start'>
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 px-3 h-auto w-[50%]'>
                <div className='truncate'>
                    {file.name}
                </div>
            </TableCell>
            
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 px-3 h-auto w-[25%]'>
                <div className='flex items-center gap-2 min-w-0'>
                    <span className='flex-shrink-0'>
                        {getIcon(file.type)}
                    </span>
                    <span className='truncate'>
                        {file.type || "Unknown"}
                    </span>
                </div>
            </TableCell>
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 px-3 h-auto w-[15%]'>
                <div className='truncate'>
                     {size}{abbreviation}
                </div>
            </TableCell>
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 px-3 h-auto w-[10%]'>
                <Button 
                    variant="outline" 
                    size="icon" 
                    className='w-6 h-6'
                    onClick={() => onRemoveFile(file.name)}
                >
                    <Trash2 className='!size-3 text-red-500' />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default SelectedFilesTableRow