
import { FileUploadAction, FileUploadState } from "@/types/state";

export const fileUploadReducer = (state: FileUploadState, action: FileUploadAction): FileUploadState => {
    switch (action.type) {
        case "ADD_FILE":
            return { ...state, files:[...state.files,...action.payload]};
        case "REMOVE_FILE":
            const filteredFiles = state.files.filter((existingFile:File) => existingFile.name !== action.payload)
            return { ...state, files: filteredFiles }
        default:
            return state;
    }
};