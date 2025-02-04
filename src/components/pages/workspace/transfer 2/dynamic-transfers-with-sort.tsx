"use client"

import { ResponseMeta } from "@/types/common"
import { Transfer } from "@prisma/client"
import type { FC } from "react"
import { use } from "react"
import TransferList from "./transfer-list"
import { PaginationControls } from "@/components/common/pagination"

interface DynamicTransfersWithSortingProps {
  transfersPromise: Promise<{ data: Transfer[]; meta: ResponseMeta }>
}

export const DynamicTransfersWithSorting: FC<DynamicTransfersWithSortingProps> = ({ transfersPromise }) => {
  const { data: transfers, meta } = use(transfersPromise)
  return (
    <>
      <div className="p-4 flex-grow">
        <TransferList transfers={transfers} />
      </div>
      <PaginationControls numPages={meta.totalPages}/>
    </>
  )
}

