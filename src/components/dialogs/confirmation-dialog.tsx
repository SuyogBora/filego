import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FC } from 'react'
import TinyLoader from "../common/tiny-loader"


interface ConfirmationDialogProps {
    open: boolean,
    isLoading?:boolean,
    onClose: () => void,
    onAction: () => void
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ open, onClose, onAction,isLoading }) => {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="min-w-[80px]">Cancel</AlertDialogCancel>
                    <AlertDialogAction  className="min-w-[80px]" onClick={onAction}>{isLoading ? <TinyLoader/> : "Continue"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmationDialog
