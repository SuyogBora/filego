"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { FC } from "react";
import SelectedFileList from "./selected-file-list";
import SelectedFilesTableRow from "./selected-file-row";

interface SelectedFilesTableProps {
    files: File[],
    onRemoveFile: (fileName: string) => void
}

const SelectedFilesTable: FC<SelectedFilesTableProps> = ({ files, onRemoveFile }) => {
    const isTableScreen = useMediaQuery("(max-width: 800px)")
    return (
        <SelectedFileList files={files} onRemoveFile={onRemoveFile} />
    );
};

export default SelectedFilesTable;
