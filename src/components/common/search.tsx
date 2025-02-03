'use client'

import { searchParams } from '@/lib/searchParams';
import { useQueryState, useQueryStates } from 'nuqs';
import { Input } from '../ui/input';

export default function Search({ onChange, value }: {
    onChange: (value: string) => void,
    value: string
}) {
    return (
        <form className="relative flex  flex-col gap-1 w-[400px]">
            <Input
                autoComplete="off"
                id="q"
                onChange={(e) => {
                    onChange(e.target.value)
                }}
                value={value}
                name="q"
                placeholder="Search in task transfer"
                type="search"
            />
        </form>
    );
}