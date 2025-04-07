"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format, setMonth, setYear } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/api/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

// Schema expects a date, but we will only store the month & year
const FormSchema = z.object({
  dob: z.date({
    required_error: "A month and year are required.",
  }),
})

interface MonthYearPickerProps {
  onDateSelect: (month: number, year: number) => void
}

export function MonthYearPicker({ onDateSelect }: MonthYearPickerProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  function handleSelect(month: number, year: number) {
    const newDate = setYear(setMonth(new Date(), month), year) // Month is 0-based
    form.setValue("dob", newDate)
    onDateSelect(month, year)
  }

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   const monthNumber = format(data.dob, "MM") // Get month as "02"
  //   const yearNumber = format(data.dob, "yyyy") // Get year as "2025"
  //   console.log("Selected:", `${yearNumber}-${monthNumber}`) // Logs "2025-02"
  // }

  return (
    <Form {...form}>
      <form className="space-y-2 flex flex-col justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !form.watch("dob") && "text-muted-foreground"
              )}
            >
              {form.watch("dob") ? (
                format(form.watch("dob")!, "MMMM yyyy")
              ) : (
                <span>Select Month & Year</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 space-y-2">
            {/* Year Selection */}
            <select
              className="w-full p-2 border rounded-md"
              value={selectedYear ?? ""}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              <option value="" disabled>
                Select Year
              </option>
              {Array.from({ length: 31 }, (_, i) => 2000 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Month Selection */}
            <select
              className="w-full p-2 border rounded-md"
              value={selectedMonth ?? ""}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              <option value="" disabled>
                Select Month
              </option>
              {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                <option key={month} value={month}>
                  {format(setMonth(new Date(), month), "MMMM")}
                </option>
              ))}
            </select>

            {/* Confirm Button */}
            <Button
              onClick={() => {
                if (selectedMonth !== null && selectedYear !== null) {
                  handleSelect(selectedMonth, selectedYear)
                }
              }}
              className="w-full mt-2"
            >
              Confirm
            </Button>
          </PopoverContent>
        </Popover>
      </form>
    </Form>
  )
}
