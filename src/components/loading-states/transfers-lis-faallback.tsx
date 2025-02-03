import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

const TransferListItemSkeleton: FC = () => {
    const SkeletonActionButton = () => (
        <Skeleton className="w-8 h-8" />
    );

    return (
        <li className="border border-border p-4 rounded-sm flex items-center justify-between">
            <div className="flex items-start gap-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <div className="mt-2">
                        <ul className="flex items-center gap-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-32" />
                        </ul>
                    </div>
                </div>
            </div>
            <div className="gap-1 flex items-center">
                {[...Array(5)].map((_, index) => (
                    <SkeletonActionButton key={index} />
                ))}
            </div>
        </li>
    );
};


/**
 * LoadingState Component
 * Displays while transfers are being fetched
 */
export const TransferListFallback: FC = () => (
    <div className="space-y-4 p-4">
        {[...Array(3)].map((_, index) => (
            <TransferListItemSkeleton key={index} />
        ))}
    </div>
);

