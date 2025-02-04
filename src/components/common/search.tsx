'use client'

import { searchParams } from '@/lib/searchParams';
import { useQueryState, useQueryStates } from 'nuqs';
import { Input } from '../ui/input';
import { SearchCheck, SearchIcon } from 'lucide-react';
import TinyLoader from './tiny-loader';

export default function Search({ onChange, value,isTransitionPending}: {
    onChange: (value: string) => void,
    value: string,
    isTransitionPending?:boolean
}) {
    return (
        <form className="relative flex  flex-col gap-1 w-[250px]">
            <Input
                autoComplete="off"
                id="q"
                onChange={(e) => {
                    onChange(e.target.value)
                }}
                value={value}
                name="q"
                className='font-semibold text-xs ps-9'
                placeholder="Search in task transfer"
                type="search"
            />
            <span className='absolute top-1/2 -translate-y-1/2 left-3'>
              {
                !isTransitionPending ? <SearchIcon className='size-4'/> : <TinyLoader className='w-5 h-5 text-primary'/>
              }
            </span>
        </form>
    );
}