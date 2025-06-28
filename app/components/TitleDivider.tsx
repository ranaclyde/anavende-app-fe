import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'

interface TitleDividerProps {
  title: string
  href?: string
  btnText?: string
}

const TitleDivider = ({ title, href, btnText }: TitleDividerProps) => {
  return (
    <div className="flex items-center">
      <span className="shrink-0 pe-4 text-black text-3xl font-bold">
        {title}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
      {href && btnText && (
        <a
          href={href}
          className="flex flex-row items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span>{btnText}</span>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            size={20}
            color="currentColor"
            strokeWidth={2}
          />
        </a>
      )}
    </div>
  )
}

export default TitleDivider
