import React from 'react'
import clsx from 'clsx'

interface ContainerProps {
  children: React.ReactNode
  tag?: React.ElementType
  className?: string
}

const Container = ({
  children,
  tag: Tag = 'div',
  className,
}: ContainerProps) => {
  return (
    <Tag className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  )
}

export default Container
