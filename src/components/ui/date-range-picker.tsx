"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import TinyLoader from "../common/tiny-loader"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange
  onDateChange?: (date: DateRange | undefined) => void,
  isTransitionPending?:boolean
}

export function DatePickerWithRange({ className, date, onDateChange,isTransitionPending }: DatePickerWithRangeProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    date
  )

  React.useEffect(() => {
    setDateRange(date)
  }, [date])

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDateRange(newDate)
    onDateChange?.(newDate)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[250px] justify-start px-3 text-left gap-2 font-semibold hover:bg-background text-xs", !dateRange && "text-muted-foreground")}
          >
            {
              !isTransitionPending ? <CalendarIcon className="h-4 w-4" /> : <TinyLoader className='w-5 h-5 text-primary' />
            }
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

