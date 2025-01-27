import PageWrapper from '@/components/common/page-wrapper'
import DynamicTransfersWithSorting from '@/components/pages/workspace/transfer/dynamic-transfers-with-sort'
import { FC } from 'react'

interface TransferPageProps {

}

const TransferPage: FC<TransferPageProps> = ({ }) => {
  return (
    <PageWrapper>
      <div className="">
        <DynamicTransfersWithSorting/>
      </div>
    </PageWrapper>
  )
}

export default TransferPage