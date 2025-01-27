"use client"

import { Input } from '@/components/ui/input'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC, useState } from 'react'
import TransferList from './transfer-list'

interface Transfer {
  id: string
  transfer_title: string
  transfer_display_name: string
  transfer_message: string
  transfer_mode: string
  file_size: number
  file_type: string
  file_is_password_enabled: boolean
  file_extension: string
  recipient_email: string
  total_files: number
  max_downloads: number
  expiration_date: string
  created_at: string
  updated_at: string
  download_analytics: any
}

interface PageData {
  data: Transfer[]
  meta: {
    total: number
    totalPages: number
    currentPage: number
    perPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}


const DynamicTransfersWithSorting: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const fetchTransfers = async ({ pageParam = 1 }) => {
    const response = await axios.get('/api/transfer', {
      params: {
        page: pageParam,
        limit: 1,
        search: searchTerm || undefined
      }
    })
    console.log(response,"response")
    return response.data
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['transfers', searchTerm], 
    queryFn: fetchTransfers,
    initialPageParam: 1,
    getNextPageParam: (lastPage: PageData) => 
      lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
  })

  const allTransfers = data?.pages.flatMap(page => page.data) ?? []
console.log(allTransfers,"allTransfers")
  return (
    <>
      <div className="filteration-sorting space-y-4">
        <div className="search-container">
          <Input
            type="text"
            placeholder="Search transfers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <div className="transfer_list">
        <TransferList transfers={allTransfers} />
        
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}
        
        {isFetching && !isFetchingNextPage && <div>Fetching...</div>}
      </div>
    </>
  )
}

export default DynamicTransfersWithSorting