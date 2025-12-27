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

import { type SimpleProduct } from '@/interfaces/products'
import { type Pagination as PaginationType } from '@/interfaces/pagination'

interface ProductsContentProps {
  products?: SimpleProduct[]
  pagination?: PaginationType
}

const ProductsContent = ({
  products = [],
  pagination,
}: ProductsContentProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
                        <Filters />
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
              <Filters />
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
                    className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 data-focus:outline-none"
                  />
                </div>

                {/* Ordenamiento */}
                <div className="sm:w-48">
                  <SortButton />
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            {products.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-sm text-gray-600">
                  No hay productos que coincidan con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Paginación (placeholder) */}
                <Pagination pagination={pagination} />
              </>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}

export default ProductsContent
