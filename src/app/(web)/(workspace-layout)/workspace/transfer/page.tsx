import PageWrapper from "@/components/common/page-wrapper"
import { TransferListFallback } from "@/components/loading-states/transfers-lis-faallback"
import { DynamicTransfersWithSorting } from "@/components/pages/workspace/transfer/dynamic-transfers-with-sort"
import { TransfersFilter } from "@/components/pages/workspace/transfer/transfers-filter"
import { auth } from "@/lib/auth/auth"
import { transfersMetadata } from "@/lib/metadata"
import { getAllTransfers } from "@/lib/queries/transfer"
import { searchParamsCache } from "@/lib/searchParams"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Suspense } from "react"

interface TransfersPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export const metadata: Metadata = transfersMetadata

export default async function TransfersPage({ searchParams }: TransfersPageProps) {
  const session = await auth()
  if (!session?.user.id) redirect("/")

  const searchParamsResolved = await searchParams
  const { q, limit, page, mode, dateFrom, dateTo } = searchParamsCache.parse(searchParamsResolved)

  const transfersPromise = getAllTransfers(session.user.id, {
    page,
    limit,
    q,
    mode,
    dateFrom,
    dateTo
  })

  return (
    <PageWrapper noPadding className="flex flex-col">
      <TransfersFilter />
      <Suspense key={`${q}-${page}-${mode}`} fallback={<TransferListFallback />}>
        <DynamicTransfersWithSorting transfersPromise={transfersPromise} />
      </Suspense>
    </PageWrapper>
  )
}