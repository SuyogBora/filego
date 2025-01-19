
import { FileUploadAction, IFileUploadState } from "@/types/upload";
import { initialState } from "../context/upload-context";

export const fileUploadReducer = (
    state: IFileUploadState,
    action: FileUploadAction
): IFileUploadState => {
    switch (action.type) {
        case "ADD_FILE":
            return { ...state, files: [...state.files, ...action.payload] };
        case "REMOVE_FILE":
            const filteredFiles = state.files.filter(
                (existingFile: File) => existingFile.name !== action.payload
            );
            return { ...state, files: filteredFiles };
        case "ADD_TRANSFER_DETAILS":
            return { ...state, transferInfo: action.payload };
        case "CHANGE_UPLOAD_STAGE":
            return { ...state, uploadStage: action.payload };
        case "CHANGE_TRANSFERED_DATA_SIZE":
            return { ...state, transfered_data_size: action.payload };
        case "CHANGE_UPLOAD_STAGES_LOADING_FLAG":
            return {
                ...state,
                uploadStagesLoadingFlags: {
                    ...state.uploadStagesLoadingFlags,
                    [action.payload.stage]: action.payload.loadingFlag,
                },
            };
            case "RESET_STATE": {
                const type = action.payload;
                if (type === 'deep') {
                  return { ...initialState };
                }
                const preservedTransferInfo = {
                //   file_is_password_enabled: state.transferInfo.file_is_password_enabled,
                //   transfer_mode: state.transferInfo.transfer_mode,
                //   transfer_title: state.transferInfo.transfer_title,
                //   file_password: state.transferInfo.file_password,
                //   recipient_email: state.transferInfo.recipient_email,
                //   transfer_message: state.transferInfo.transfer_message,
                };
                return {
                  ...initialState,
                  files: state.files,
                  transferInfo: {
                    ...initialState.transferInfo,
                    ...preservedTransferInfo 
                  }
                };
              }
        default:
            return state;
    }
};