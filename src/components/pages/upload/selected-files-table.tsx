"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FC } from "react";
import SelectedFilesTableRow from "./selected-file-row";
import { useFileUploadContext } from "@/lib/context/upload-context";
import { cn } from "@/lib/utils";

interface SelectedFilesTableProps { 
    files:File[],
    onRemoveFile:(fileName:string)=>void
}

const SelectedFilesTable: FC<SelectedFilesTableProps> = ({files,onRemoveFile}) => {
    return (
        <>
            <div className="overflow-x-auto border border-border rounded-sm md:rounded-md">
                <Table className={cn("",{
                    "min-w-[600px]" : files.length > 0
                })}>
                    <TableHeader>
                        <TableRow className='border-border'>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto'>File Name</TableHead>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto'>Type</TableHead>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto'>Size</TableHead>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto w-[60px]'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {files.length > 0 ? (
                            files.map((file: File, index: number) => (
                               <SelectedFilesTableRow onRemoveFile={onRemoveFile} key={file.name} file={file}/>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="">
                                    <div className="h-[120px] flex items-center justify-center">
                                        No files selected.
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default SelectedFilesTable;
