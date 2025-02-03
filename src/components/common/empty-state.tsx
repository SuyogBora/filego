import { FC } from 'react'

interface EmptyStateProps {
    text?:string,
    description?:string
}

const EmptyState: FC<EmptyStateProps> = ({text,description}) => {
    return (
        <div className="text-center py-10 border border-dashed rounded-md">
            <h3 className="text-lg font-semibold">{text ?? "No Data Available"}</h3>
            <p className="text-muted-foreground">{description ?? "Try adjusting your search terms"}</p>
        </div>
    )
}

export default EmptyState