export const variantClasses = {
  primary: {
    default: [
      'text-white',
      'bg-purple-600',
      'hover:bg-purple-700',
      'disabled:bg-purple-600 disabled:opacity-40',
    ],
    outlined: [
      'text-purple-500',
      'border border-purple-500',
      'hover:text-white hover:bg-purple-500',
      'disabled:disabled:bg-transparent disabled:text-purple-400 disabled:opacity-40',
    ],
    ghost: [
      'text-purple-600',
      'hover:bg-purple-100 hover:bg-opacity-10',
      'disabled:disabled:bg-transparent disabled:text-purple-400 disabled:opacity-40',
    ],
    link: [
      'text-purple-600',
      'hover:underline hover:underline-offset-2',
      'disabled:disabled:bg-transparent disabled:text-purple-400 disabled:opacity-40',
    ],
  },
  success: {
    default: [
      'text-white',
      'bg-green-600',
      'hover:bg-green-700',
      'disabled:bg-green-600 disabled:opacity-40',
    ],
    outlined: [
      'text-green-500',
      'border border-green-500',
      'hover:text-white hover:bg-green-500',
      'disabled:disabled:bg-transparent disabled:text-green-400 disabled:opacity-40',
    ],
    ghost: [
      'text-green-600',
      'hover:bg-green-100 hover:bg-opacity-10',
      'disabled:disabled:bg-transparent disabled:text-green-400 disabled:opacity-40',
    ],
    link: [
      'text-green-600',
      'hover:underline hover:underline-offset-2',
      'disabled:disabled:bg-transparent disabled:text-green-400 disabled:opacity-40',
    ],
  },
  info: {
    default: [
      'text-white',
      'bg-blue-600',
      'hover:bg-blue-700',
      'disabled:bg-blue-600 disabled:opacity-40',
    ],
    outlined: [
      'text-blue-500',
      'border border-blue-500',
      'hover:text-white hover:bg-blue-500',
      'disabled:disabled:bg-transparent disabled:text-blue-400 disabled:opacity-40',
    ],
    ghost: [
      'text-blue-600',
      'hover:bg-blue-100 hover:bg-opacity-10',
      'disabled:disabled:bg-transparent disabled:text-blue-400 disabled:opacity-40',
    ],
    link: [
      'text-blue-600',
      'hover:underline hover:underline-offset-2',
      'disabled:disabled:bg-transparent disabled:text-blue-400 disabled:opacity-40',
    ],
  },
}

export const shapeClasses = {
  default: 'rounded-md',
  pill: 'rounded-full',
  square: 'rounded-none',
}

export const sizeClasses = {
  xs: ['px-2 py-1 text-xs'],
  sm: ['px-3 py-2 text-sm'],
  md: ['px-5 py-2.5 text-sm'],
  lg: ['px-5 py-3 text-base'],
}

export const initClasses = [
  'cursor-pointer font-semibold',
  'inline-flex items-center justify-center gap-1',
  'text-center font-semibold',
  'disabled:cursor-not-allowed disabled:shadow-none',
]
