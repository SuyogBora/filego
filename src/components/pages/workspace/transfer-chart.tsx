"use client";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
  } from "@/components/ui/card"
  import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
  import { Bar, BarChart, XAxis, YAxis } from "recharts"
  
  const dailyTransfersData = [
    { date: '20 Jan', transfers: 5, size: 120 },
    { date: '21 Jan', transfers: 8, size: 210 },
    { date: '22 Jan', transfers: 12, size: 345 },
    { date: '23 Jan', transfers: 6, size: 180 },
    { date: '24 Jan', transfers: 10, size: 276 },
    { date: '25 Jan', transfers: 15, size: 412 },
  ]
  
  const chartConfig = {
    transfers: {
      label: "Transfers",
      color: "hsl(var(--chart-1))",
    },
    size: {
      label: "Size (GB)",
      color: "hsl(var(--chart-2))",
    },
  }
  
  export const TransfersChart = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daily Transfers Overview</CardTitle>
          <CardDescription>Transfers count and size by date</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={dailyTransfersData}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="transfers" fill="var(--color-transfers)" />
              <Bar dataKey="size" fill="var(--color-size)" />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }
  
  export default TransfersChart