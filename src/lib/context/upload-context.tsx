"use client";

import { addTransferLogAction, getUploadPresignedUrlAction } from "@/lib/actions/transfer";
import { TransferMode, UploadStage, UploadStageType } from "@/lib/constants";
import { useToast } from "@/lib/hooks/use-toast";
import { fileUploadReducer } from "@/lib/reducers/upload-reducers";
import { filterFiles, generateDownloadUrl, getFileDetails } from "@/lib/utils";
import { ITransferInfo, TransferFormValue } from "@/types/transfer";
import { IFileUploadContextValue, IFileUploadState } from '@/types/upload';
import axios from "axios";
import { usePathname } from "next/navigation";
import { addDays } from 'date-fns';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from "react";

// Initial state configuration for file upload process
export const initialState: IFileUploadState = {
  files: [],
  uploadStagesLoadingFlags: {
    PREPARATION: false,
    PROGRESS: false,
    COMPLETE: false,
  },
  uploadStage: UploadStage.PREPARATION,
  transfered_data_size: 0,
  transferInfo: {
    file_is_password_enabled: false,
    transfer_mode: TransferMode.MANUAL_SEND,
    transfer_title: "",
    file_password: "",
    recipient_email: "",
    transfer_message: "",
    file_extension: "",
    file_storage_key: "",
    file_size: 0,
    file_type: "",
    total_files: 0,
    max_downloads: -1,
    transfer_display_name:"",
    transfer_start_time: new Date(),
  }
};

const FileUploadContext = createContext<IFileUploadContextValue | null>(null);

export const FileUploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { toast } = useToast();
  const pathname = usePathname()
  const [state, dispatch] = useReducer(fileUploadReducer, initialState);

  // Resets the upload process to initial state
  const resetUploadProcess = useCallback((resetType: "deep" | "shallow") => {
    dispatch({ type: "RESET_STATE", payload: resetType });
  }, []);

  // Updates the current stage of file upload
  const updateUploadStage = useCallback((stage: UploadStageType) => {
    dispatch({ type: "CHANGE_UPLOAD_STAGE", payload: stage });
  }, []);

  // Updates loading state for different upload stages
  const updateStageLoadingState = useCallback((stage: UploadStageType, isLoading: boolean) => {
    dispatch({ type: "CHANGE_UPLOAD_STAGES_LOADING_FLAG", payload: { stage, loadingFlag: isLoading } });
  }, []);

  // Updates transfer information
  const updateTransferInfo = useCallback((info: ITransferInfo) => {
    dispatch({ type: "ADD_TRANSFER_DETAILS", payload: info });
  }, []);

  // Updates the amount of data transferred
  const updateTransferProgress = useCallback((dataSize: number) => {
    dispatch({ type: "CHANGE_TRANSFERED_DATA_SIZE", payload: dataSize });
  }, []);

  // Handles adding new files to the upload queue
  const addFilesToQueue = useCallback((files: File[]) => {
    const { duplicates, newFiles } = filterFiles(files, state.files);
    
    if (newFiles.length > 0) {
      dispatch({ type: "ADD_FILE", payload: newFiles });
    }

    if (duplicates.length > 0) {
      toast({
        title: "Duplicate Files Detected",
        description: duplicates.join(", "),
        variant: "destructive",
      });
    }
  }, [toast, state.files]);

  // Removes a file from the upload queue
  const removeFileFromQueue = useCallback((fileName: string) => {
    dispatch({ type: "REMOVE_FILE", payload: fileName });
  }, []);

  // Handles the main file transfer process
  const processFileTransfer = async (formData: TransferFormValue) => {
    try {
      // Get file details
      const fileDetails = await getFileDetails(state.files);
      if (!fileDetails) {
        toast({
          title: "Error",
          description: "Unable to process file details. Please try again.",
          variant: "destructive"
        });
        resetUploadProcess("shallow");
        return;
      }

      const transferDetails: ITransferInfo = {
        ...formData,
        file_extension: fileDetails.file_extension,
        file_size: fileDetails.file_size,
        file_storage_key: fileDetails.file_storage_key,
        file_type: fileDetails.file_type,
        transfer_display_name: fileDetails.transfer_display_name,
        total_files: fileDetails.total_files,
        expiration_date: addDays(new Date(), 1),
        max_downloads: -1,
        user_id: undefined,
        transfer_start_time: new Date(),
      };

      // Update state with transfer details and progress
      updateTransferInfo(transferDetails);
      updateUploadStage(UploadStage.PROGRESS);
      updateStageLoadingState(UploadStage.PROGRESS, true);

      // Get presigned URL for upload
      const [presignedUrlResult, presignedUrlError] = await getUploadPresignedUrlAction({
        file_storage_key: transferDetails.file_storage_key,
        file_type: transferDetails.file_type,
      });
      if (presignedUrlError) {
        toast({
          title: "Upload Error",
          description: presignedUrlError.message || "Failed to prepare upload URL",
          variant: "destructive"
        });
        resetUploadProcess("shallow");
        return;
      }

      if (!presignedUrlResult) {
        toast({
          title: "Upload Error",
          description: "Failed to generate upload URL",
          variant: "destructive"
        });
        resetUploadProcess("shallow");
        return;
      }

      updateStageLoadingState(UploadStage.PROGRESS, false);

      // Upload file to storage
      const uploadResponse = await axios.put(presignedUrlResult.data.url, fileDetails.file_blob, {
        headers: { 
          "Content-Type": fileDetails.file_type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            updateTransferProgress(progressEvent.loaded);
          }
        },
      });

      if (uploadResponse.status === 200) {
        // Create transfer log with display_name
        const [transferLogResult, transferLogError] = await addTransferLogAction(transferDetails);

        if (transferLogError) {
          toast({
            title: "Transfer Log Error",
            description: transferLogError.message || "Failed to save transfer details",
            variant: "destructive"
          });
          resetUploadProcess("shallow");
          return;
        }

        if (!transferLogResult) {
          toast({
            title: "Transfer Log Error , Please Try Again",
            description: "Failed to create transfer",
            variant: "destructive"
          });
          resetUploadProcess("shallow");
          return;
        }

        const downloadUrl = generateDownloadUrl(transferLogResult.data.id)
        updateTransferInfo({
          ...transferDetails,
          transfer_url: downloadUrl
        });
        updateUploadStage(UploadStage.COMPLETE);
        toast({
          title: transferLogResult.message,
          variant: "default"
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
        description: error.message || "An unexpected error occurred during file transfer",
        variant: "destructive"
      });
      resetUploadProcess("shallow");
    }
  };

  // Initialize clean state on mount
  useEffect(() => {
    resetUploadProcess("deep");
  }, [pathname]);

  const uploadActions = {
    addFilesToQueue,
    removeFileFromQueue,
    processFileTransfer,
    updateUploadStage,
    resetUploadProcess
  };

  return (
    <FileUploadContext.Provider value={{ state, mutationFuncs: uploadActions }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUploadContext = (): IFileUploadContextValue => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error(
      "useFileUploadContext must be used within a FileUploadContextProvider"
    );
  }
  return context;
};