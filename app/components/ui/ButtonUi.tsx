import React from 'react'
import clsx from 'clsx'
import { Button, type ButtonProps } from '@headlessui/react'

import {
  variantClasses,
  sizeClasses,
  shapeClasses,
  initClasses,
} from './buttonClasses'

interface ButtonUiProps extends ButtonProps {
  color?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
  variant?: 'default' | 'ghost' | 'link' | 'outlined'
  shape?: keyof typeof shapeClasses
}

const ButtonUi = ({
  color = 'primary',
  size = 'md',
  variant = 'default',
  shape = 'default',
  className,
  children,
  ...rest
}: ButtonUiProps) => {
  const classes = [
    variantClasses[color][variant],
    sizeClasses[size],
    shapeClasses[shape],
  ]
  return (
    <Button className={clsx(initClasses, classes, className)} {...rest}>
      {children}
    </Button>
  )
}

export default ButtonUi
