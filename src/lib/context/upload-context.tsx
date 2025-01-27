"use client";

import { addTransferLogAction, getUploadPresignedUrlAction, updateTransferMetricsAction } from "@/lib/actions/transfer";
import { TransferMode, UploadStage, UploadStageType } from "@/lib/constants";
import { useToast } from "@/lib/hooks/use-toast";
import { fileUploadReducer } from "@/lib/reducers/upload-reducers";
import { filterFiles, generateDownloadUrl, getFileDetails } from "@/lib/utils";
import { ITransferInfo, TransferFormValue } from "@/types/transfer";
import { IFileUploadContextValue, IFileUploadState } from '@/types/upload';
import axios, { CancelTokenSource } from "axios";
import { addDays } from 'date-fns';
import { usePathname } from "next/navigation";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef
} from "react";
import { sanitizeZSAError } from "../error";

/**
 * Initial state for the file upload process
 * Includes file queue, loading states, upload stage, and transfer information
 */
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
    transfer_display_name: "",
    transfer_start_time: new Date(),
  }
};

// Create context with type safety
const FileUploadContext = createContext<IFileUploadContextValue | null>(null);

/**
 * Provider component for managing file upload state and operations
 * Handles file queue, upload process, and transfer details
 */
export const FileUploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const [state, dispatch] = useReducer(fileUploadReducer, initialState);
  const uploadCancelTokenSourceRef = useRef<CancelTokenSource | null>(null);
  /**
   * State Management Functions
   */
  const resetUploadProcess = useCallback((resetType: "deep" | "shallow") => {
    if (uploadCancelTokenSourceRef.current && resetType === "shallow") {
      uploadCancelTokenSourceRef.current.cancel('Upload canceled by user');
    }
    dispatch({ type: "RESET_STATE", payload: resetType });
  }, []);

  const updateUploadStage = useCallback((stage: UploadStageType) => {
    dispatch({ type: "CHANGE_UPLOAD_STAGE", payload: stage });
  }, []);

  const updateStageLoadingState = useCallback((stage: UploadStageType, isLoading: boolean) => {
    dispatch({ type: "CHANGE_UPLOAD_STAGES_LOADING_FLAG", payload: { stage, loadingFlag: isLoading } });
  }, []);

  const updateTransferInfo = useCallback((info: ITransferInfo) => {
    dispatch({ type: "ADD_TRANSFER_DETAILS", payload: info });
  }, []);

  const updateTransferProgress = useCallback((dataSize: number) => {
    dispatch({ type: "CHANGE_TRANSFERED_DATA_SIZE", payload: dataSize });
  }, []);

  /**
   * File Queue Management Functions
   */
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

  const removeFileFromQueue = useCallback((fileName: string) => {
    dispatch({ type: "REMOVE_FILE", payload: fileName });
  }, []);

  /**
   * Main file transfer process handler
   * Manages the entire lifecycle of file upload from preparation to completion
   */
  const processFileTransfer = async (formData: TransferFormValue) => {
    try {
      // Step 1: Process file details
      updateStageLoadingState(UploadStage.PREPARATION, true);
      const fileDetails = await getFileDetails(state.files);
      updateStageLoadingState(UploadStage.PREPARATION, false);

      if (!fileDetails) {
        toast({
          title: "Error",
          description: "Unable to process file details. Please try again.",
          variant: "destructive"
        });
        resetUploadProcess("shallow");
        return;
      }

      // Step 2: Prepare transfer details
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
        transfer_start_time: new Date(),
      };

      // Step 3: Initialize upload process
      updateTransferInfo(transferDetails);
      updateUploadStage(UploadStage.PROGRESS);
      updateStageLoadingState(UploadStage.PROGRESS, true);

      // Step 4: Get upload URL
      const [presignedUrlResult, presignedUrlError] = await getUploadPresignedUrlAction({
        file_storage_key: transferDetails.file_storage_key,
        file_type: transferDetails.file_type
      });

      if (presignedUrlError) {
        toast({
          title: "Upload Error",
          description: sanitizeZSAError(presignedUrlError).message || "Failed to prepare upload URL",
          variant: "destructive"
        });
        resetUploadProcess("shallow");
        return;
      }

      updateStageLoadingState(UploadStage.PROGRESS, false);

      // Step 5: Upload file
      uploadCancelTokenSourceRef.current = axios.CancelToken.source();
      const uploadResponse = await axios.put(presignedUrlResult.data.url, fileDetails.file_blob, {
        cancelToken: uploadCancelTokenSourceRef.current.token,
        headers: {
          "Content-Type": fileDetails.file_type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            updateTransferProgress(progressEvent.loaded);
          }
        },
      });

      // Step 6: Process successful upload
      if (uploadResponse.status === 200) {
        // Set loading state before async operations
        updateStageLoadingState(UploadStage.COMPLETE, true);
        updateUploadStage(UploadStage.COMPLETE);

        try {
          const [transferLogResult, transferLogError] = await addTransferLogAction(transferDetails);

          if (transferLogError) {
            toast({
              title: "Transfer Log Error",
              description: sanitizeZSAError(transferLogError).message || "Failed to save transfer details",
              variant: "destructive"
            });
            resetUploadProcess("shallow");
            return;
          }

          // Step 7: Complete transfer process
          const downloadUrl = generateDownloadUrl(transferLogResult.data.id);
          updateTransferInfo({
            ...transferDetails,
            transfer_url: downloadUrl
          });
          updateStageLoadingState(UploadStage.COMPLETE, false);
          toast({
            title: transferLogResult.message,
            variant: "default"
          });

          // Update transfer metrics
          await updateTransferMetricsAction({
            fileSize: transferDetails.file_size
          });
        } finally {
          updateStageLoadingState(UploadStage.COMPLETE, false);
        }
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

  // Reset state when pathname changes
  useEffect(() => {
    resetUploadProcess("deep");
  }, [pathname]);

  // Aggregate all upload-related actions
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

/**
 * Hook to access file upload context
 * Must be used within FileUploadContextProvider
 */
export const useFileUploadContext = (): IFileUploadContextValue => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error(
      "useFileUploadContext must be used within a FileUploadContextProvider"
    );
  }
  return context;
};