import { cn } from '@/lib/utils'
import { FC, PropsWithChildren } from 'react'

interface ScrollableWrapperProps extends PropsWithChildren{
    className?:string
}

const ScrollableWrapper: FC<ScrollableWrapperProps> = ({children,className}) => {
  return (
      <div className={cn("overflow-y-auto h-full min-h-[inherit] p-4",className)}>
          {children}
      </div>
  )
}

export default ScrollableWrapper