"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { searchParams } from "@/lib/searchParams"
import { useQueryState } from "nuqs"
import type { FC } from "react"

type TransferModeToggleProps = {}

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

const TransferModeToggle: FC<TransferModeToggleProps> = () => {
  const [modes, setModes] = useQueryState(
    "mode",
    searchParams.mode
  )

  const handleToggle = (mode: TransferMode) => {
    setModes((currentModes) => {
      if (currentModes.includes(mode)) {
        return currentModes.filter((m) => m !== mode)
      } else {
        return [...currentModes, mode]
      }
    })
  }

  return (
    <div className="flex items-center gap-2 p-2.5 rounded-md bg-sidebar">
      {items.map((item) => (
        <div className="flex items-center gap-2" key={item.id}>
          <Checkbox id={item.id} checked={modes.includes(item.id)} onCheckedChange={() => handleToggle(item.id)} />
          <Label htmlFor={item.id} className="font-semibold text-xs">
            {item.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default TransferModeToggle

