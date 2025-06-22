import React from 'react'

interface TitleDividerProps {
  title?: string
}

const TitleDivider = ({ title }: TitleDividerProps) => {
  return (
    <div className="flex items-center">
      <span className="shrink-0 pe-4 text-[#832833] text-3xl font-bold">
        {title}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
    </div>
  )
}

export default TitleDivider
