import React, { useState } from "react"
import { LuMapPin } from "react-icons/lu"
import states from "@/components/editProfileTenant/provinces.json" // Import the JSON file
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function ProvinceField({ control }: { control: any }) {
  const [filteredStates, setFilteredStates] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (value: string) => {
    setInputValue(value)

    // Filter states based on user input
    if (value) {
      const matches = states.filter((state) =>
        state.toLowerCase().startsWith(value.toLowerCase())
      )
      setFilteredStates(matches)
    } else {
      setFilteredStates([])
    }
  }

  const handleStateSelect = (
    state: string,
    onChange: (value: string) => void
  ) => {
    setInputValue(state)
    setFilteredStates([])
    onChange(state) // Pass the selected value to the form
  }

  return (
    <FormField
      control={control}
      name="province"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">Province</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="text-sm"
                placeholder="Enter province"
                icon={<LuMapPin size={20} />}
                value={inputValue}
                onChange={(e) => {
                  handleInputChange(e.target.value)
                  field.onChange(e.target.value) // Update form state on input change
                }}
              />
              {filteredStates.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded shadow w-full max-h-40 overflow-y-auto mt-1">
                  {filteredStates.map((state, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                      onClick={() => handleStateSelect(state, field.onChange)} // Trigger field.onChange when selected
                    >
                      {state}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
