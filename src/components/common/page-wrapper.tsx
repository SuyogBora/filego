import { cn } from '@/lib/utils'
import { FC, PropsWithChildren, CSSProperties } from 'react'

interface PageWrapperProps extends PropsWithChildren {
  fixedHeight?: boolean;
  className?: string;
  noPadding?: boolean;
}

const PageWrapper: FC<PageWrapperProps> = ({ 
  children, 
  fixedHeight = false, 
  className,
  noPadding = false
}) => {
  const headerHeight = 54; // in pixels

  const baseStyle: CSSProperties = {
    width: '100%',
    height: `calc(100vh - ${headerHeight}px)`,
    overflowY: fixedHeight ? 'hidden' : 'auto',
  };

  const paddingStyle: CSSProperties = noPadding ? {} : {
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
  };

  return (
    <div 
      className={cn(
        "w-full",
        {
          'sm:p-6 md:p-8': !noPadding,
        },
        className
      )}
      style={{
        ...baseStyle,
        ...paddingStyle,
      }}
    >
      {children}
    </div>
  )
}

export default PageWrapper
