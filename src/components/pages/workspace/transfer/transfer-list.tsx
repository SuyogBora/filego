import ConfirmationDialog from '@/components/dialogs/confirmation-dialog';
import { deleteTransferLogAction, updateTransferMetricsAction } from '@/lib/actions/transfer';
import { useToast } from '@/lib/hooks/use-toast';
import { DialogType, TransferAction } from '@/types/transfer';
import { Transfer } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useServerAction } from 'zsa-react';
import TransferListItem from './transfer-list-item';

interface TransferListProps {
    transfers: Transfer[]
}

const TransferList: React.FC<TransferListProps> = ({ transfers }) => {
    const [activeDialog, setActiveDialog] = useState<DialogType | null>(null);
    const [currentAction, setCurrentAction] = useState<TransferAction | null>(null);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    // server actions 
    const { isPending:deleteTransferLogPeningFlag, execute: deleteTransferLogExecute } = useServerAction(deleteTransferLogAction);
    // handlers  
    const handleAction = (action: TransferAction) => {
        setCurrentAction(action);
        setActiveDialog(action.type);
    };

    const handleClose = () => {
        setActiveDialog(null);
        setCurrentAction(null);
    };

    const handleDeleteTransferLog = async () => {
        if (currentAction?.type === 'delete') {
            try {
                const [data,err] = await deleteTransferLogExecute({
                    id:currentAction.values.transferId
                });
                if(err){
                     toast({
                        title:err.message,
                        variant:"destructive"
                     })
                }
                toast({
                    title:data?.message
                })
                await queryClient.invalidateQueries({ queryKey: ['transfers'] });
                await updateTransferMetricsAction({
                    action:"fileDeleted"
                })
                // handleClose();
            } catch (error) {
                console.error('Failed to delete transfer:', error);
            }
        }
    };

    return (
        <>
            <ul className="flex flex-col gap-2">
                {transfers.map((transfer) => (
                    <TransferListItem
                        key={transfer.id}
                        transfer={transfer}
                        onAction={handleAction}
                    />
                ))}
            </ul>
            <ConfirmationDialog isLoading={deleteTransferLogPeningFlag} open={activeDialog === "delete"} onAction={handleDeleteTransferLog} onClose={handleClose} />
        </>
    );
};

export default TransferList