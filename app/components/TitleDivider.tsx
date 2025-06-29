import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import LinkUi from './ui/LinkUi'

interface TitleDividerProps {
  title: string
  href?: string
  btnText?: string
}

const TitleDivider = ({ title, href, btnText }: TitleDividerProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="shrink-0 pe-4 text-black text-xl lg:text-3xl font-bold">
        {title}
      </span>
      <span className="hidden lg:inline-block h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
      {href && btnText && (
        <LinkUi color="info" href={href}>
          <span className="hidden md:inline-block">{btnText}</span>
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            size={20}
            color="currentColor"
            strokeWidth={2}
          />
        </LinkUi>
      )}
    </div>
  )
}

export default TitleDivider
