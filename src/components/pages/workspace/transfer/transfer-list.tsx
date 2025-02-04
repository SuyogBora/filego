"use client";

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Transfer } from '@prisma/client'
import { useServerAction } from 'zsa-react'
import { useToast } from '@/lib/hooks/use-toast'
import { DialogType, TransferAction } from '@/types/transfer'
import { deleteTransferLogAction, updateTransferMetricsAction } from '@/lib/actions/transfer'
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import TransferListItem from './transfer-list-item'

interface TransferListProps {
  transfers: Transfer[]
}

const TransferList = ({ transfers }: TransferListProps) => {
  const [activeDialog, setActiveDialog] = useState<DialogType | null>(null)
  const [currentAction, setCurrentAction] = useState<TransferAction | null>(null)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const { isPending: isDeletePending, execute: executeDelete } = useServerAction(deleteTransferLogAction)

  const handleAction = (action: TransferAction) => {
    setCurrentAction(action)
    setActiveDialog(action.type)
  }

  const handleClose = () => {
    setActiveDialog(null)
    setCurrentAction(null)
  }

  const handleDeleteTransferLog = async () => {
    if (currentAction?.type !== 'delete') return

    try {
      const [data, err] = await executeDelete({
        id: currentAction.values.transferId
      })

      if (err) {
        toast({
          title: err.message,
          variant: "destructive"
        })
        return
      }

      toast({ title: data?.message })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transfers'] }),
        updateTransferMetricsAction({ action: "fileDeleted" })
      ])
    } catch (error) {
      console.error('Failed to delete transfer:', error)
      toast({
        title: 'Failed to delete transfer',
        variant: "destructive"
      })
    }
  }

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
      <ConfirmationDialog 
        isLoading={isDeletePending}
        open={activeDialog === "delete"}
        onAction={handleDeleteTransferLog}
        onClose={handleClose}
      />
    </>
  )
}

export default TransferList
