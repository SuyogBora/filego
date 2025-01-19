import DownloadTransferFilesUI from '@/components/pages/download/download-files-ui';
import TransferExpiredUI from '@/components/pages/download/transfer-expired-ui';
import { Container } from '@/components/ui/container';
import { type Transfer as ITransfer } from '@prisma/client';
import { cache, FC } from 'react';

export const getTransferLog = cache(async (transfer_id: string): Promise<ITransfer | null> => {
    const reponse = await fetch(`http://localhost:3000/api/transfer/${transfer_id}`)
    const data = await reponse.json()
    return data as ITransfer | null;
});     

interface DownloadPageProps {
    params: Promise<{ transfer_id: string }>
}

const DownloadPage: FC<DownloadPageProps> = async ({ params }) => {
    const transfer_id = (await params).transfer_id
    const transferLog = await getTransferLog(transfer_id);
    return (
        <section className=''>
            <Container>
                <div className="min-h-[calc(100vh-102px)] w-full py-10 grid place-items-center">
                    {
                        !transferLog ? (<TransferExpiredUI/>) : (<DownloadTransferFilesUI transferLog={transferLog}/>)
                    }
                </div>
            </Container>
        </section>
    )
}

export default DownloadPage