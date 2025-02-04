"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { FC } from "react"

type TransferModeToggleProps = {
  onToggleValue: (newValues: string[]) => void
  values: string[]
}

const items = [
  {
    id: "MANUAL_SEND",
    label: "Manual Send",
  },
  {
    id: "EMAIL_SEND",
    label: "Email Send",
  },
] as const

type TransferMode = (typeof items)[number]["id"]

const TransferModeToggle: FC<TransferModeToggleProps> = ({ onToggleValue, values }) => {
  const handleToggle = (mode: TransferMode) => {
    if (values.includes(mode)) {
      const newValues = values.filter((m) => m !== mode)
      onToggleValue(newValues)
    } else {
      onToggleValue([...values, mode])
    }
  }

  return (
    <div className="flex items-center gap-2 p-2.5 rounded-md bg-background border border-border">
      {items.map((item) => (
        <div className="flex items-center gap-2" key={item.id}>
          <Checkbox 
            id={item.id} 
            checked={values.includes(item.id)} 
            onCheckedChange={() => handleToggle(item.id)} 
          />
          <Label htmlFor={item.id} className="font-semibold text-xs">
            {item.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default TransferModeToggle