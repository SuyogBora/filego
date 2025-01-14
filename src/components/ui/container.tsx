import { cn } from '@/lib/utils'
import { FC, PropsWithChildren } from 'react'

interface ContainerProps extends PropsWithChildren {
    className?: string
}

const Container: FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={cn("container", className)}>
            {children}
        </div>
    )
}

export {Container}