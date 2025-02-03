'use client'

import { searchParams } from '@/lib/searchParams'
import { cn } from '@/lib/utils'
import {
    Pagination,
    PaginationButton,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { useQueryState } from 'nuqs'
import React from 'react'

type PaginationControlsProps = {
    numPages: number
}

// Use client-side hooks to update the page number
// and observe the loading state
export function PaginationControls({
    numPages
}: PaginationControlsProps) {
    const [isLoading, startTransition] = React.useTransition()
    const [page, setPage] = useQueryState(
        'page',
        searchParams.page.withOptions({
            startTransition,
            shallow: false
        })
    )
    return (
        <Pagination className="not-prose items-center justify-start gap-2 px-4 py-2 border-border !border-t">
            <div className="flex items-center gap-0">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        />
                    </PaginationItem>
                    {Array.from({ length: numPages }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationButton
                                className='w-7 h-7'
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationButton>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            disabled={page === numPages}
                            onClick={() => setPage(p => Math.min(numPages, p + 1))}
                        />
                    </PaginationItem>
                </PaginationContent>
                <div
                    aria-label={isLoading ? 'Loading' : 'Idle'}
                    aria-live={isLoading ? 'polite' : undefined}
                    className={cn(
                        'h-2 w-2 rounded-full bg-green-500',
                        isLoading && 'animate-pulse bg-amber-500'
                    )}
                />
            </div>
        </Pagination>
    )
}
