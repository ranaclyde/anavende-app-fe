'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@headlessui/react'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

// Hooks
import { useDebounce } from '@/hooks/useDebounce'

const MIN_SEARCH_LENGTH = 3

const SearchProductInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSearch = searchParams.get('search') ?? ''
  const [searchTerm, setSearchTerm] = useState(currentSearch)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    const currentSearchParam = params.get('search') ?? ''

    if (debouncedSearchTerm.length >= MIN_SEARCH_LENGTH) {
      // Solo actualizar si el valor cambió
      if (currentSearchParam !== debouncedSearchTerm) {
        params.set('search', debouncedSearchTerm)
        params.delete('page')
        router.push(`${pathname}?${params.toString()}`)
      }
    } else if (currentSearchParam !== '') {
      // Solo eliminar si existía el parámetro
      params.delete('search')
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [debouncedSearchTerm, pathname, router])

  return (
    <div className="flex-1 relative">
      <HugeiconsIcon
        icon={Search01Icon}
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
      />
      <Input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 data-focus:outline-none"
      />
      {searchTerm.length > 0 && searchTerm.length < MIN_SEARCH_LENGTH && (
        <p className="absolute top-full mt-1 text-xs text-gray-500">
          Escribe al menos {MIN_SEARCH_LENGTH} caracteres para buscar
        </p>
      )}
    </div>
  )
}

export default SearchProductInput
