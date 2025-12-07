'use client'
import { useState } from 'react'
import {
  Search01Icon,
  FilterIcon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Input,
} from '@headlessui/react'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/ProductCard'
import Pagination from './components/Pagination'
import Filters from './components/Filters'
import SortButton from './components/SortButton'

export const ProductsContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategory('')
    setSelectedBrands([])
    setSearchTerm('')
  }

  return (
    <main>
      <Breadcrumbs links={[{ href: '/productos', label: 'Productos' }]} />

      <Container tag="section" className="mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <HugeiconsIcon icon={FilterIcon} size={20} />
              <span>Filtros</span>
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          <Dialog
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            className="relative z-50 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                  <DialogPanel
                    transition
                    className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:-translate-x-full"
                  >
                    <TransitionChild>
                      <div className="absolute top-0 right-0 -mr-8 flex pt-4 pl-2 duration-500 ease-in-out data-closed:opacity-0">
                        <button
                          type="button"
                          onClick={() => setSidebarOpen(false)}
                          className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Cerrar filtros</span>
                          <HugeiconsIcon
                            icon={Cancel01Icon}
                            strokeWidth={2}
                            className="size-6"
                          />
                        </button>
                      </div>
                    </TransitionChild>
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto p-6">
                        <Filters
                          clearAllFilters={clearAllFilters}
                          handleCategoryChange={handleCategoryChange}
                          handleBrandChange={handleBrandChange}
                          selectedCategory={selectedCategory}
                          selectedBrands={selectedBrands}
                        />
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </div>
          </Dialog>

          {/* Desktop Sidebar - Filtros */}
          <aside className="hidden lg:block w-80">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Filters
                clearAllFilters={clearAllFilters}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
                selectedCategory={selectedCategory}
                selectedBrands={selectedBrands}
              />
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de búsqueda y ordenamiento */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Buscador */}
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
                    className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 data-[focus]:outline-none"
                  />
                </div>

                {/* Ordenamiento */}
                <div className="sm:w-48">
                  <SortButton sortBy={sortBy} setSortBy={setSortBy} />
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Repetimos ProductCard para mostrar varios productos */}
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCard key={index} />
              ))}
            </div>

            {/* Paginación */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Mostrando 1-12 de 48 productos
                </p>
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
