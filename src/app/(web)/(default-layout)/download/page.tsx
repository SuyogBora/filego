import { downloadMetadata, uploadMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { FC } from 'react'

interface DownloadFilesPageProps {
  
}
export const metadata: Metadata = downloadMetadata

const DownloadFilesPage: FC<DownloadFilesPageProps> = ({}) => {
  return <div>DownloadFilesPage</div>
}

export default DownloadFilesPage