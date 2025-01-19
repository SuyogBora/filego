import CircularProgress from '@/components/common/circular-progress';
import TinyLoader from '@/components/common/tiny-loader';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { formatFileSize, getUploadPercentage } from '@/lib/utils';
import { differenceInSeconds, format } from 'date-fns';
import React, { useMemo } from 'react';

interface UploadProgressStageProps {
  onCancel: () => void;
  transferredDataSize: number;
  transferTotalSize: number;
  isLoading: boolean;
  transferStartTime?: Date;
}

const UploadProgressStage: React.FC<UploadProgressStageProps> = ({ 
  onCancel,
  isLoading,
  transferredDataSize,
  transferTotalSize,
  transferStartTime
}) => {
  let formattedStartTime;
  if(transferStartTime){
     formattedStartTime = format(transferStartTime, 'yyyy-MM-dd HH:mm:ss');
  }
  const { 
    formattedTotalSize, 
    formattedTransferredSize, 
    transferredDataPercentage,
    estimatedTimeRemaining
  } = useMemo(() => {
    const total = formatFileSize(transferTotalSize);
    const transferred = formatFileSize(transferredDataSize);
    const percentage = getUploadPercentage(transferTotalSize, transferredDataSize);
    let estimatedTime = 'Calculating...';
    if (percentage > 0 && transferStartTime) {
      const elapsedSeconds = differenceInSeconds(new Date(), transferStartTime);
      const totalEstimatedSeconds = (elapsedSeconds / percentage) * 100;
      const remainingSeconds = totalEstimatedSeconds - elapsedSeconds;

      if (remainingSeconds < 60) {
        estimatedTime = 'Less than a minute';
      } else {
        const minutes = Math.ceil(remainingSeconds / 60);
        estimatedTime = `${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
    }
    return { 
      formattedTotalSize: total, 
      formattedTransferredSize: transferred, 
      transferredDataPercentage: percentage,
      estimatedTimeRemaining: estimatedTime
    };
  }, [transferTotalSize, transferredDataSize, transferStartTime]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        {isLoading ? (
          <TinyLoader />
        ) : (
          <>
            <CircularProgress 
              percentage={transferredDataPercentage} 
              size="xl" 
              circleClassName="stroke-secondary" 
              progressClassName="dark:stroke-white stroke-black" 
              strokeWidth="thick"
              textClassName="font-bold"
            />
            <div className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-green-500">
                  {formattedTransferredSize.size.toFixed(2)} {formattedTransferredSize.abbreviation}
                </span>
                <span className="mx-1">of</span>
                <span className="font-semibold text-primary">
                  {formattedTotalSize.size.toFixed(2)} {formattedTotalSize.abbreviation}
                </span>
                <span className="block mt-1">Please don't cancel or refresh the page</span>
              </p>
              <div className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full bg-muted">
                Estimated time: {estimatedTimeRemaining}
              </div>
            </div>
          </>
        )}
      </div>
      <DialogFooter>
        <Button 
          type="button" 
          variant="destructive" 
          className="w-full" 
          onClick={onCancel}
        >
          Cancel Upload
        </Button>
      </DialogFooter>
    </div>
  );
};

export default UploadProgressStage;

