import { FileUp, HardDrive, Link2, Send, Share2 } from 'lucide-react'
import { FC } from 'react'
import { KPICard } from './kpi-card'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export const KPISection: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <KPICard
        icon={<FileUp />}
        value={1287}
        description="Total unique file transfer links created across all sessions"
      />
      <KPICard
        icon={<HardDrive />}
        value="42.5 TB"
        description="Cumulative data volume transferred through all links"
      />
      <KPICard
        icon={<Share2 />}
        value={15}
        description="Active file transfer links (excluding expired)"
      />
      <div className="lg:hidden">
        <Link
          href={"/upload"}
          className={cn(buttonVariants({
            className: "min-w-[120px] xxs:min-w-[130px] w-full sm:min-w-[140px] md:min-w-[150px] shadow-md gap-2",
            variant: "default",
            size:"lg"
          }))}
        >
          Transfer File Now <Send className="w-4 h-4 xxs:w-5 xxs:h-5" />
        </Link>
      </div>
    </div>
  )
}

export default KPISection