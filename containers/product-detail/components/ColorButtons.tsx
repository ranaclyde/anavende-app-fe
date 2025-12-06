import clsx from 'clsx'
import React from 'react'

import { Color } from '@/interfaces/colors'

interface ColorButtonsProps {
  colors: Color[]
  isSelected: boolean
  onClick: () => void
}

const ColorButtons = ({ colors, isSelected, onClick }: ColorButtonsProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-8 h-8 rounded-full border-2 relative overflow-hidden',
        {
          'border-[#832833] ring-2 ring-[#832833]/20': isSelected,
          'border-gray-300': !isSelected,
        }
      )}
      title={colors.map((c) => c.name).join(' / ')}
    >
      {colors.length === 1 && (
        <div
          className="w-full h-full"
          style={{ backgroundColor: colors[0].hex }}
        />
      )}
      {colors.length === 2 && (
        <>
          <div
            className="absolute inset-0 w-1/2"
            style={{ backgroundColor: colors[0].hex }}
          />
          <div
            className="absolute inset-0 left-1/2 w-1/2"
            style={{ backgroundColor: colors[1].hex }}
          />
        </>
      )}
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
        </div>
      )}
    </button>
  )
}

export default ColorButtons
