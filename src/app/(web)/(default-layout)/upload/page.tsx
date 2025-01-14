import MegaFileDropzone from '@/components/pages/upload/mega-dropzone'
import MiniFileDropzone from '@/components/pages/upload/mini-dropzone'
import PrepareUpload from '@/components/pages/upload/prepare-upload'
import { Container } from '@/components/ui/container'
import { uploadMetadata } from '@/lib/metadata'
import { Metadata } from 'next'
import { FC } from 'react'

interface UploadFilesPageProps {

}
export const metadata: Metadata = uploadMetadata

const UploadFilesPage: FC<UploadFilesPageProps> = ({ }) => {
    return (
        <section className=''>
            <MegaFileDropzone className='min-h-[calc(100vh-102px)] w-full py-4 xxs:py-6 sm:py-8 md:py-10'>
                <Container>
                   <PrepareUpload/>
                </Container>
            </MegaFileDropzone>
        </section>
    )
}

export default UploadFilesPage