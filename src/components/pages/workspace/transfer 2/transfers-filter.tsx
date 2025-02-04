"use client";

import Search from '@/components/common/search';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { FC } from 'react';
import TransferModeToggle from './transfer-mode-toggle';
import { useRouter } from 'next/navigation';

interface TransfersFilterProps { }

const TransfersFilter: FC<TransfersFilterProps> = () => {
   const {replace} = useRouter()
    return (
        <div className="TransferFilter flex items-center gap-4 p-4 pb-0 flex-wrap">
            <Search />
            <TransferModeToggle />
            <DatePickerWithRange />
            <Button onClick={()=>replace("/workspace/transfer")}>
                Clear All
            </Button>
        </div>
    );
}

export default TransfersFilter;