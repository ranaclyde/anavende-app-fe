import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import React from 'react'

interface BreadcrumbsProps {
  links: {
    href: string
    label: string
  }[]
}

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 h-12 text-sm overflow-x-auto scrollbar-hide">
          <Link href="/" className="text-gray-600 hover:text-gray-900 whitespace-nowrap shrink-0">
            Inicio
          </Link>
          {links.map((link, index) => (
            <React.Fragment key={link.href}>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                color="currentColor"
                className="w-4 h-4 text-gray-400 shrink-0"
              />
              {link.href !== '#' ? (
                <Link
                  href={link.href}
                  className={`text-gray-600 hover:text-gray-900 ${
                    index === links.length - 1 
                      ? 'truncate max-w-50 sm:max-w-none' 
                      : 'whitespace-nowrap shrink-0'
                  }`}
                  title={link.label}
                >
                  {link.label}
                </Link>
              ) : (
                <span 
                  className={`text-gray-600 ${
                    index === links.length - 1 
                      ? 'truncate max-w-50 sm:max-w-none' 
                      : 'whitespace-nowrap shrink-0'
                  }`}
                  title={link.label}
                >
                  {link.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Breadcrumbs
