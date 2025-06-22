import * as React from 'react'

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 20 20"
    className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export default ChevronRight
