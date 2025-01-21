// app/download/[transfer_id]/page.tsx
import DownloadTransferFilesUI from '@/components/pages/download/download-files-ui';
import TransferExpiredUI from '@/components/pages/download/transfer-expired-ui';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Skeleton } from "@/components/ui/skeleton";
import { type Transfer } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Force dynamic rendering for real-time transfer status
export const dynamic = 'force-dynamic'

// Type definitions
interface PageProps {
    params: {
        transfer_id: string;
    };
}

/**
 * Fetches transfer data from the API
 * @param transfer_id - The unique identifier for the transfer
 * @returns Promise resolving to Transfer object or null if not found
 */
async function getTransferLog(transfer_id: string): Promise<Transfer | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfer/${transfer_id}`);

        // Simulated delay for testing loading states (remove in production)
        await new Promise((res) => setTimeout(res, 5000));

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Failed to fetch transfer: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching transfer:', error);
        return null;
    }
}

/**
 * Loading skeleton component using shadcn/ui
 * Matches the structure of the actual content for smooth transitions
 */
function LoadingState() {
    return (
        <Card className="w-full">
            <CardHeader className="space-y-2">
                <Skeleton className="h-3 w-[60%]" />
                <Skeleton className="h-2 w-[80%]" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-4 w-[50%]" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-4 w-[50%]" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-8 w-full" />
            </CardFooter>
        </Card>
    );
}

/**
 * Component to handle the download file logic and UI rendering
 * Shows expired UI if transfer is not found
 */
async function DownloadFiles({ transfer_id }: { transfer_id: string }) {
    const transferLog = await getTransferLog(transfer_id);

    if (!transferLog) {
        return <TransferExpiredUI />;
    }

    return <DownloadTransferFilesUI transferLog={transferLog} />;
}

/**
 * Main download page component
 * Handles the layout and suspense boundary for the download interface
 */
export default async function DownloadPage({ params }: PageProps) {
    // Next.js 14 requires await for params
    const transfer_id = (await params).transfer_id;

    if (!transfer_id) {
        notFound();
    }

    return (
        <section>
            <Container>
                <div className="min-h-[calc(100vh-102px)] w-full py-10 grid place-items-center">
                    <div className="mx-auto flex flex-col justify-center w-full items-center gap-4 md:max-w-[800px]">
                        <Suspense fallback={<LoadingState />}>
                            <DownloadFiles transfer_id={transfer_id} />
                        </Suspense>
                    </div>
                </div>
            </Container>
        </section>
    );
}

/**
 * Generate metadata for the page
 * @param params - Contains the transfer_id from the URL
 */
export async function generateMetadata({ params }: PageProps) {
    const transfer_id = (await params).transfer_id;
    return {
        title: `Download Transfer ${transfer_id}`,
        description: 'Download your transferred files',
    };
}