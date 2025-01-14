// upload state types

export  type FileUploadState = {
    files: File[];
}
export type FileUploadAction =
    | { type: "ADD_FILE"; payload: File[] }
    | { type: "REMOVE_FILE"; payload: string}

export type FileUploadMutationFuncs = {
    handleAddFiles: (files: File[]) => void,
    handleRemoveFile:(fileName:string) => void
}

export type FileUploadContextValue  = {
    state: FileUploadState;
    mutationFuncs:FileUploadMutationFuncs
}

export enum TransferMode {
    MANUAL_SEND = "MANUAL_SEND",
    EMAIL_SEND = "EMAIL_SEND",
}

export enum UploadStatus {
    INITIAL = "initial",
    INITIALIZING = "initializing",
    PROGRESS = "progress",
    COMPLETE = "complete",
}
