import React from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import clsx from 'clsx'

interface UnitySelectProps {
  availableQuantity: number
  quantity: number
  setQuantity: (quantity: number) => void
}

const UnitySelect = ({
  availableQuantity,
  quantity,
  setQuantity,
}: UnitySelectProps) => {
  return (
    <Menu as="div" className="relative">
      <MenuButton
        disabled={availableQuantity === 0}
        className="inline-flex items-center gap-1 text-hippie-blue hover:text-hippie-blue-700 font-medium transition-colors cursor-pointer"
      >
        <span>
          {quantity} {quantity === 1 ? 'unidad' : 'unidades'}
        </span>
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
      </MenuButton>
      <MenuItems
        transition
        className="absolute left-0 mt-2 w-48 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 z-10"
      >
        <div className="p-1 max-h-60 overflow-y-auto">
          {Array.from(
            { length: Math.min(availableQuantity, 10) },
            (_, i) => i + 1
          ).map((num) => (
            <MenuItem key={num}>
              {({ focus }) => (
                <button
                  onClick={() => setQuantity(num)}
                  className={clsx(
                    'w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer',
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    quantity === num && 'font-semibold text-hippie-blue'
                  )}
                >
                  {num} {num === 1 ? 'unidad' : 'unidades'}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default UnitySelect
