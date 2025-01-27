"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Send } from 'lucide-react';
import React, { FC } from 'react';

interface KPICardProps {
    icon?: React.ReactNode
    value: string | number
    description: string
}

export const KPICard: FC<KPICardProps> = ({
    icon = <Send />,
    value,
    description
}) => {
    return (
        <Card className='bg-green-400/5 border border-green-500/10 border-dashed'>
            <CardContent className='p-6 flex items-center gap-4'>
                <div className="w-14 flex items-center gap-2 justify-center h-14 border-border border rounded-full">
                    {icon}
                </div>
                <div className="">
                    <h3 className='font-bold text-3xl mb-2 text-green-400'>{value}</h3>
                    <p className='text-xs font-medium text-muted-foreground'>{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}