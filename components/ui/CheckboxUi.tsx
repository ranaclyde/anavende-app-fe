import { Field, Checkbox, Label } from '@headlessui/react'
import React from 'react'

interface CheckboxUiProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

const CheckboxUi = ({ checked, onChange, label }: CheckboxUiProps) => {
  return (
    <Field className="flex items-center">
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="group block size-4 rounded border border-gray-300 bg-white data-checked:bg-indigo-600 data-checked:border-indigo-600"
      >
        <svg
          className="stroke-white opacity-0 group-data-checked:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="m3 8 2.5 2.5L12 4"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      <Label className="ml-2 text-sm text-gray-700 cursor-pointer">
        {label}
      </Label>
    </Field>
  )
}

export default CheckboxUi
