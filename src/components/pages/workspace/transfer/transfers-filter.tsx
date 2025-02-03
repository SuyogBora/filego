"use client"

import Search from '@/components/common/search'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { searchParams } from "@/lib/searchParams"
import { useRouter } from 'next/navigation'
import { parseAsIsoDate, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { DateRange } from 'react-day-picker'
import TransferModeToggle from './transfer-mode-toggle'

interface TransfersFilterProps { }

const TransfersFilter: FC<TransfersFilterProps> = () => {
  const [{ q, mode, dateFrom, dateTo }, setParams] = useQueryStates({
    q: searchParams.q,
    mode: searchParams.mode,
    page: searchParams.page,
    dateFrom: searchParams.dateFrom,
    dateTo: searchParams.dateTo
  }, {
    history: 'push',
    shallow: false
  })
  const handleSearchChange = (value: string) => {
    setParams({ q: value })
    setParams({ page: 1 })
  }
  const handleModeToggle = (newModes: string[]) => {
    setParams({ mode: newModes.length > 0 ? newModes : null })
    setParams({ page: 1 })
  }
  const handleClearAll = () => {
    setParams({
      q: null,
      mode: null,
      dateFrom: null,
      dateTo: null
    })
  }
  const handleDateRangeChange = (dateRange?: DateRange) => {
    console.log(dateRange)
    if (dateRange?.from && dateRange.to) {
      setParams({ dateFrom: dateRange.from, dateTo: dateRange.to })
    } else {
      setParams({ dateFrom: null, dateTo: null })
    }
  }
  const selectedDateRange = dateFrom && dateTo ? {
    from: new Date(dateFrom),
    to: new Date(dateTo)
  } : undefined

  return (
    <div className="flex items-center gap-4 p-4 pb-0 flex-wrap">
      <Search
        value={q ?? ""}
        onChange={handleSearchChange}
      />
      <TransferModeToggle
        values={mode ?? []}
        onToggleValue={handleModeToggle}
      />
      <DatePickerWithRange
        date={selectedDateRange as DateRange}
        onDateChange={handleDateRangeChange}
      />
      <Button onClick={handleClearAll}>
        Clear All
      </Button>
    </div>
  )
}

export default TransfersFilter