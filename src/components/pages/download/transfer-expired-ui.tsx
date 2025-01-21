import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface TransferExpiredUIProps {}

const TransferExpiredUI: FC<TransferExpiredUIProps> = () => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className='py-2.5 sm:py-4 px-4 bg-destructive'>
                <CardTitle className="mb-1">Transfer Expired</CardTitle>
                <CardDescription className="text-xs leading-[1.5]">
                    The link you are trying to access has expired. Please contact the sender for more details.
                </CardDescription>
            </CardHeader>
            <CardContent className='!py-8'>
                <p className="text-sm text-muted-foreground">
                    Transfer links are only available for a limited time. If you believe this is a mistake, reach out to the sender to confirm the status of the transfer.
                </p>
            </CardContent>
            <CardFooter>
                <Link href={"/"} className={cn(buttonVariants({variant:"secondary",className:"w-full"}))}>
                    Go to Homepage
                </Link>
            </CardFooter>
        </Card>
    );
};

export default TransferExpiredUI;
