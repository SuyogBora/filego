import { FC } from 'react'

interface TransferDetailsPageProps {
       params:Promise<{
          transfer_id:string
       }>
}

const TransferDetailsPage: FC<TransferDetailsPageProps> = async ({params}) => {
  const transferId = (await params).transfer_id
  return(
    <div className="">
          {transferId}
    </div>
  )
}

export default TransferDetailsPage