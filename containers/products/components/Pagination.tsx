'use client'
import React, { useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { type Pagination as PaginationType } from '@/interfaces/pagination'
import Link from 'next/link'

interface PaginationProps {
  pagination?: PaginationType
}

const Pagination = ({ pagination }: PaginationProps) => {
  if (!pagination) {
    return null
  }

  const { page, pageSize, pageCount, total } = pagination

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const isFirstPage = page <= 1
  const isLastPage = page >= pageCount

  const makeUrl = (targetPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    if (targetPage <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(targetPage))
    }
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  // Pages rendering with ellipsis when many pages. Show up to 3 numeric pages inline (plus first/last if needed)
  const pages = useMemo<(number | 'ellipsis')[]>(() => {
    const result: (number | 'ellipsis')[] = []
    if (pageCount <= 3) {
      for (let i = 1; i <= pageCount; i++) result.push(i)
    } else {
      if (page <= 2) {
        result.push(1, 2, 3, 'ellipsis', pageCount)
      } else if (page >= pageCount - 1) {
        result.push(1, 'ellipsis', pageCount - 2, pageCount - 1, pageCount)
      } else {
        result.push(1, 'ellipsis', page, 'ellipsis', pageCount)
      }
    }
    return result
  }, [page, pageCount])

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Mostrando {start}-{end} de {total} productos
        </p>
      </div>
      <nav className="flex items-center space-x-2" aria-label="Pagination">
        <Link
          href={makeUrl(page - 1)}
          className={`px-3 py-2 text-sm font-medium border border-gray-300 rounded-l-md ${
            isFirstPage
              ? 'text-gray-300 bg-white pointer-events-none cursor-not-allowed'
              : 'text-gray-500 bg-white hover:bg-gray-50'
          }`}
        >
          Anterior
        </Link>

        {pages.map((pageOption, idx) =>
          pageOption === 'ellipsis' ? (
            <span key={`e-${idx}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <Link
              key={pageOption}
              href={makeUrl(pageOption)}
              aria-current={pageOption === page ? 'page' : undefined}
              className={`px-3 py-2 text-sm font-medium border ${
                pageOption === page
                  ? 'text-white bg-merlot border-merlot'
                  : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageOption}
            </Link>
          )
        )}

        <Link
          href={makeUrl(page + 1)}
          className={`px-3 py-2 text-sm font-medium border border-gray-300 rounded-r-md ${
            isLastPage
              ? 'text-gray-300 bg-white pointer-events-none cursor-not-allowed'
              : 'text-gray-500 bg-white hover:bg-gray-50'
          }`}
        >
          Siguiente
        </Link>
      </nav>
    </div>
  )
}

export default Pagination
