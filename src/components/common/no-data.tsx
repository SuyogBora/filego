// src/components/common/no-data.tsx
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface NoDataProps {
  title: string
  description?: string
  icon?: LucideIcon | React.ComponentType<{ className?: string }>
  className?: string
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: ReactNode
}

export function NoData({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  children
}: NoDataProps) {
  return (
    <div className={cn(
      "border-border border p-6 rounded-xl flex flex-col items-center justify-center gap-4",
      className
    )}>
      {Icon && (
        <div className="flex items-center justify-center">
          <Icon className={cn('w-14 h-14', iconClassName)} />
        </div>
      )}
      <div className="text-content text-center">
        <h3 className={cn('text-sm font-semibold mb-1', titleClassName)}>
          {title}
        </h3>
        {description && (
          <p className={cn('text-xs text-muted-foreground', descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}