"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TransferModeType, UploadStage, UploadStageType } from "@/lib/constants";
import { useFileUploadContext } from "@/lib/context/upload-context";
import { FC } from "react";
import UploadCompleteStage from "../pages/upload/upload-complete-stage";
import UploadProgressStage from "../pages/upload/upload-progress-stage";
import UploadPreparationStage from "../pages/upload/uploadd-preparation-stage";

interface FileTransferDialogsProps {
    open: boolean;
    onClose: () => void;
    transferMode: TransferModeType;
}
const STAGE_CONFIGS: Record<UploadStageType, { title: string; description: string }> = {
    [UploadStage.PREPARATION]: {
        title: "Transfer Details",
        description: "Fill out the form below to configure your transfer. Click 'Save' to proceed."
    },
    [UploadStage.PROGRESS]: {
        title: "Transfer in Progress",
        description: "Your transfer is currently in progress. Please do not close this dialog."
    },
    [UploadStage.COMPLETE]: {
        title: "Transfer Complete",
        description: "Your transfer has been successfully completed. You can now close this dialog."
    }
};

const FileTransferDialogs: FC<FileTransferDialogsProps> = ({ open, onClose, transferMode }) => {
    const {
        state: {
            files,
            uploadStage,
            transferInfo,
            transfered_data_size,
            uploadStagesLoadingFlags
        },
        mutationFuncs: {
            processFileTransfer,
            resetUploadProcess,
            updateUploadStage
        }
    } = useFileUploadContext();

    const renderStageComponent = () => {
        switch (uploadStage) {
            case UploadStage.PREPARATION:
                return (
                    <UploadPreparationStage
                        onCancle={onClose}
                        onSave={processFileTransfer}
                        transferMode={transferMode}
                        transferTitle={files[0].name}
                    />
                );
            case UploadStage.PROGRESS:
                return (
                    <UploadProgressStage
                        onCancel={() => {
                            resetUploadProcess("shallow")
                            updateUploadStage(UploadStage.PREPARATION)
                        }}
                        transferStartTime={transferInfo.transfer_start_time}
                        transferTotalSize={transferInfo.file_size}
                        transferredDataSize={transfered_data_size}
                        isLoading={uploadStagesLoadingFlags.PROGRESS}
                    />
                );
            case UploadStage.COMPLETE:
                return (
                    <UploadCompleteStage
                        onCancel={() => {
                            resetUploadProcess("deep")
                            updateUploadStage(UploadStage.PREPARATION)
                            onClose()
                        }}
                        transferUrl={transferInfo.transfer_url}
                    />
                );
            default:
                return null;
        }
    };
    return (
        <Dialog open={open} onOpenChange={() => null}>
            <DialogContent hasCloseOption={false} className="max-w-[500px] p-0 border-border gap-0 overflow-hidden">
                <DialogHeader className="py-4 px-4 bg-secondary">
                    <DialogTitle className="text-base">
                        {STAGE_CONFIGS[uploadStage]?.title || ""}
                    </DialogTitle>
                    <DialogDescription className="text-xs mt-0.5 leading-[1.5]">
                        {STAGE_CONFIGS[uploadStage]?.description || ""}
                    </DialogDescription>
                </DialogHeader>
                <div className="dailog-body py-6 px-4">
                    {renderStageComponent()}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FileTransferDialogs;