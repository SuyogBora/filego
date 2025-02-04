"use client";

import { PaginationControls } from "@/components/common/pagination";
import IconNoData from "@/components/icons/icon-nodata";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResponseMeta } from "@/types/common";
import { Transfer } from "@prisma/client";
import { Send } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { NoData } from "../../../common/no-data";
import TransferList from "./transfer-list";

interface DynamicTransfersWithSortingProps {
  transfersPromise: Promise<{
    data: Transfer[]
    meta: ResponseMeta
  }>
}

export const DynamicTransfersWithSorting = ({ transfersPromise }: DynamicTransfersWithSortingProps) => {
  const { data: transfers, meta } = use(transfersPromise)

  return (
    <>
      <div className="p-4 flex-grow">
        {transfers.length ? (
          <TransferList transfers={transfers} />
        ) : (
          <NoData
            icon={IconNoData}
            title="No Active Transfer Found"
            description="Try To Reset The Fiters For It To work properly"
          >
            <Link
              href="/upload"
              className={cn(buttonVariants({
                className: "min-w-[120px] xxs:min-w-[130px] sm:min-w-[140px] md:min-w-[150px] shadow-md gap-2",
                variant: "default",
                size: "sm"
              }))}
            >
              Transfer File Now <Send className="w-4 h-4 xxs:w-5 xxs:h-5" />
            </Link>
          </NoData>
        )}
      </div>
      {meta.totalPages > 0 && <PaginationControls numPages={meta.totalPages} />}
    </>
  )
}