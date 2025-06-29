import React from 'react'
import clsx from 'clsx'
import Link, { type LinkProps } from 'next/link'

import {
  variantClasses,
  sizeClasses,
  shapeClasses,
  initClasses,
} from './buttonClasses'

interface LinkUiProps extends LinkProps {
  color?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
  variant?: 'default' | 'ghost' | 'link' | 'outlined'
  shape?: keyof typeof shapeClasses
  className?: string
  children?: React.ReactNode
}

const LinkUi = ({
  color = 'primary',
  size = 'md',
  variant = 'default',
  shape = 'default',
  className,
  children,
  ...rest
}: LinkUiProps) => {
  const classes = [
    variantClasses[color][variant],
    sizeClasses[size],
    shapeClasses[shape],
  ]
  return (
    <Link className={clsx(initClasses, classes, className)} {...rest}>
      {children}
    </Link>
  )
}

export default LinkUi
