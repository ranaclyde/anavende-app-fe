'use client'

import { useState } from 'react'
import {
  Search01Icon,
  FilterIcon,
  Cancel01Icon,
  ArrowDown01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Checkbox,
  Field,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Input,
} from '@headlessui/react'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/ProductCard'

// Datos de ejemplo para los filtros
const categories = [
  'Auriculares',
  'Headsets',
  'Mouses',
  'Teclados',
  'Monitores',
  'Webcams',
  'Parlantes',
]

const brands = [
  'Genius',
  'Kingston',
  'Marvo',
  'Netmak',
  'Noga',
  'Redragon',
  'Sandisk',
  'Suono',
  'X-Trike-Me',
]

const colors = [
  { name: 'Negro', value: '#000000' },
  { name: 'Blanco', value: '#FFFFFF' },
  { name: 'Rojo', value: '#EF4444' },
  { name: 'Azul', value: '#3B82F6' },
  { name: 'Verde', value: '#10B981' },
  { name: 'Gris', value: '#6B7280' },
]

const sortOptions = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price-low', label: 'Precio: menor a mayor' },
  { value: 'price-high', label: 'Precio: mayor a menor' },
  { value: 'alphabetical', label: 'Alfabético A-Z' },
]

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedColors([])
    setPriceRange([0, 1000])
    setSearchTerm('')
  }

  // Componente para los filtros activos
  const ActiveFilters = () => {
    if (
      selectedCategories.length === 0 &&
      selectedBrands.length === 0 &&
      selectedColors.length === 0
    ) {
      return null
    }

    return (
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Filtros aplicados
        </h4>
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {category}
              <button
                onClick={() => handleCategoryChange(category)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500"
              >
                ×
              </button>
            </span>
          ))}
          {selectedBrands.map((brand) => (
            <span
              key={brand}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {brand}
              <button
                onClick={() => handleBrandChange(brand)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
              >
                ×
              </button>
            </span>
          ))}
          {selectedColors.map((color) => (
            <span
              key={color}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              {color}
              <button
                onClick={() => handleColorChange(color)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Componente para el contenido de los filtros
  const FiltersContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Limpiar todo
        </button>
      </div>

      <ActiveFilters />

      {/* Categorías */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Field key={category} className="flex items-center">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="group block size-4 rounded border border-gray-300 bg-white data-[checked]:bg-indigo-600 data-[checked]:border-indigo-600"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="m3 8 2.5 2.5L12 4"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="ml-2 text-sm text-gray-700 cursor-pointer">
                {category}
              </Label>
            </Field>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Marcas</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <Field key={brand} className="flex items-center">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="group block size-4 rounded border border-gray-300 bg-white data-[checked]:bg-indigo-600 data-[checked]:border-indigo-600"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="m3 8 2.5 2.5L12 4"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="ml-2 text-sm text-gray-700 cursor-pointer">
                {brand}
              </Label>
            </Field>
          ))}
        </div>
      </div>

      {/* Colores */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Colores</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color.name)}
              className={`
                w-8 h-8 rounded-full border-2 relative
                ${
                  selectedColors.includes(color.name)
                    ? 'border-indigo-600 ring-2 ring-indigo-200'
                    : 'border-gray-300'
                }
              `}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {selectedColors.includes(color.name) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Rango de precios */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Rango de precios
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </>
  )

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
                        <FiltersContent />
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
              <FiltersContent />
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 data-[focus]:outline-none"
                  />
                </div>

                {/* Ordenamiento */}
                <div className="sm:w-48">
                  <Menu as="div" className="relative">
                    <MenuButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="block truncate">
                        {
                          sortOptions.find((option) => option.value === sortBy)
                            ?.label
                        }
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HugeiconsIcon
                          icon={ArrowDown01Icon}
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.value}>
                            <button
                              onClick={() => setSortBy(option.value)}
                              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-indigo-100 data-[focus]:text-indigo-900"
                            >
                              {option.label}
                            </button>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Mostrando 1-12 de 48 productos
              </p>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Repetimos ProductCard para mostrar varios productos */}
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCard key={index} />
              ))}
            </div>

            {/* Paginación */}
            <div className="mt-8 flex items-center justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 hover:bg-indigo-700">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                  Siguiente
                </button>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
