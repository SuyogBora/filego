"use client";

import { useToast } from "@/hooks/use-toast";
import { FileUploadContextValue, FileUploadState } from "@/types/state";
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useReducer
} from "react";
import { fileUploadReducer } from "../reducers/upload-reducers";
import { filterFiles } from "../utils";

const initialState: FileUploadState = {
    files: [],
};

const FileUploadContext = createContext<FileUploadContextValue | null>(null);

const FileUploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { toast } = useToast();
    const [state, dispatch] = useReducer(fileUploadReducer, initialState);

    const handleAddFiles = (files: File[]) => {
        const {duplicates,newFiles} = filterFiles(files,state.files)
        if (newFiles.length > 0) {
            dispatch({ type: "ADD_FILE", payload: newFiles });
        }
        if (duplicates.length > 0) {
            toast({
                title: "Files Already Exist",
                description: duplicates.join(", "),
                variant: "destructive"
            });
        }
    };

    const handleRemoveFile = useCallback((fileName:string) => {
        dispatch({ type: "REMOVE_FILE", payload: fileName });
    }, []);

    const mutationFuncs = {
        handleAddFiles,
        handleRemoveFile,
    };
    return (
        <FileUploadContext.Provider value={{ state, mutationFuncs }}>
            {children}
        </FileUploadContext.Provider>
    );
};

const useFileUploadContext = (): FileUploadContextValue => {
    const context = useContext(FileUploadContext);
    if (!context) {
        console.error(
            "useFileUploadContext must be used within a FileUploadContextProvider"
        );
        throw new Error(
            "useFileUploadContext must be used within a FileUploadContextProvider"
        );
    }
    return context;
};

export { FileUploadContextProvider, useFileUploadContext };
