import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/lib/auth/auth"
import { getTransfersMetrics } from "@/lib/queries/transfer"
import { cn, formatFileSize } from "@/lib/utils"
import { FileUp, HardDrive, Send, Share2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import type { FC } from "react"
import { KPICard } from "./kpi-card"
import KPISectionFallback from "@/components/loading-states/kpi-section-fallback"

export const KPISection: FC = async () => {
  const session = await auth()
  if (!session || !session.user.id) redirect("/")

  const metrics = await getTransfersMetrics(session.user.id)
  const { active_transfers_count, total_transfers_count, total_transfers_size } = metrics
  const formattedFileSize = formatFileSize(Number(total_transfers_size))

  return (
    <div className="grid grid-cols-1 gap-4">
      <KPICard
        icon={<FileUp />}
        value={total_transfers_count ?? 0}
        description="Total unique file transfer links created across all sessions"
      />
      <KPICard
        icon={<HardDrive />}
        value={`${formattedFileSize.size}${formattedFileSize.abbreviation}`}
        description="Cumulative data volume transferred through all links"
      />
      <KPICard
        icon={<Share2 />}
        value={active_transfers_count ?? 0}
        description="Active file transfer links (excluding expired)"
      />
      <div className="lg:hidden">
        <Link
          href={"/upload"}
          className={cn(
            buttonVariants({
              className: "min-w-[120px] xxs:min-w-[130px] w-full sm:min-w-[140px] md:min-w-[150px] shadow-md gap-2",
              variant: "default",
              size: "lg",
            }),
          )}
        >
          Transfer File Now <Send className="w-4 h-4 xxs:w-5 xxs:h-5" />
        </Link>
      </div>
    </div>
  )
}

export default KPISection

