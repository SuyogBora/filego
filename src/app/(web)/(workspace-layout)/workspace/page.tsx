import PageWrapper from '@/components/common/page-wrapper'
import ScrollableWrapper from '@/components/common/scrollable-wrapper'
import KPISectionFallback from '@/components/loading-states/kpi-section-fallback'
import PrepareUpload from '@/components/pages/upload/prepare-upload'
import KPISection from '@/components/pages/workspace/kpi-section'
import { FC, Suspense } from 'react'

interface WorkspaceProps {

}

const Workspace: FC<WorkspaceProps> = ({ }) => {
  return (
    <PageWrapper fixedHeight noPadding={true}>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full divide-x  divide-border">
        <ScrollableWrapper className='flex-col gap-4 flex'>
          <Suspense fallback={<KPISectionFallback/>}>
             <KPISection />
          </Suspense>
        </ScrollableWrapper>
        <ScrollableWrapper className='lg:block hidden'>
          <PrepareUpload className='text-start' />
        </ScrollableWrapper>
      </div>
    </PageWrapper>
  )
}

export default Workspace