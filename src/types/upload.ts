import { UploadStageType } from "@/lib/constants";
import { ITransferInfo, TransferFormValue } from "@/types/transfer";

export interface IFileUploadState {
    files: File[];
    uploadStagesLoadingFlags: {
        PREPARATION: boolean;
        PROGRESS: boolean;
        COMPLETE: boolean;
    };
    uploadStage: UploadStageType;
    transfered_data_size: number;
    transferInfo: ITransferInfo;
}

export type FileUploadAction =
    | { type: "ADD_FILE"; payload: File[] }
    | { type: "REMOVE_FILE"; payload: string }
    | { type: "CHANGE_UPLOAD_STAGE"; payload: UploadStageType }
    | { type: "ADD_TRANSFER_DETAILS"; payload: ITransferInfo }
    | { type: "CHANGE_TRANSFERED_DATA_SIZE"; payload: number }
    | { type: "CHANGE_UPLOAD_STAGES_LOADING_FLAG"; payload: { stage: UploadStageType, loadingFlag: boolean } }
    | { type: "RESET_STATE", payload: "deep" | "shallow" };

export interface IFileUploadMutationFuncs {
    addFilesToQueue: (files: File[]) => void;
    removeFileFromQueue: (fileName: string) => void;
    processFileTransfer: (values: TransferFormValue) => void;
    resetUploadProcess: (type: "deep" | "shallow") => void;
    updateUploadStage: (stage: UploadStageType) => void;
}

export interface IFileUploadContextValue {
    state: IFileUploadState;
    mutationFuncs: IFileUploadMutationFuncs;
}
