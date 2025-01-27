import { FC } from 'react'
import TransferListItem from './transfer-list-item'

interface TransferListProps {
    transfers: any[]
}

const TransferList: FC<TransferListProps> = ({ transfers }) => {
    return (
        <ul>
            {
                transfers.map(() => (
                    <TransferListItem
                        fileName="Project Documentation"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, atque?"
                        size="108 Mb"
                        type="Application/Zip"
                    />
                ))
            }
        </ul>
    )
}

export default TransferList