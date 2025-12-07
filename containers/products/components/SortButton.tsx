import React from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface SortButtonProps {
  sortBy: string
  setSortBy: (value: string) => void
}

const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price-low', label: 'Precio: menor a mayor' },
  { value: 'price-high', label: 'Precio: mayor a menor' },
]

const SortButton = ({ sortBy, setSortBy }: SortButtonProps) => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <span className="block truncate">
          {sortOptions.find((option) => option.value === sortBy)?.label}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </MenuButton>
      <MenuItems className="absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {sortOptions.map((option) => (
            <MenuItem key={option.value}>
              <button
                onClick={() => setSortBy(option.value)}
                className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-indigo-100 data-[focus]:text-indigo-900"
              >
                {option.label}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default SortButton
