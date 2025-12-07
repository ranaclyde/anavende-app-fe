import React from 'react'
import { Checkbox, Field, Label, Radio, RadioGroup } from '@headlessui/react'

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

interface ActiveFiltersProps {
  selectedCategory: string
  selectedBrands: string[]
  handleCategoryChange: (category: string) => void
  handleBrandChange: (brand: string) => void
}

// Componente para los filtros activos
const ActiveFilters = ({
  selectedCategory,
  selectedBrands,
  handleCategoryChange,
  handleBrandChange,
}: ActiveFiltersProps) => {
  if (!selectedCategory && selectedBrands.length === 0) {
    return null
  }

  return (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Filtros aplicados
      </h4>
      <div className="flex flex-wrap gap-2">
        {selectedCategory && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {selectedCategory}
            <button
              onClick={() => handleCategoryChange('')}
              className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500"
            >
              ×
            </button>
          </span>
        )}
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
      </div>
    </div>
  )
}

interface FiltersProps {
  clearAllFilters: () => void
  handleCategoryChange: (category: string) => void
  handleBrandChange: (brand: string) => void
  selectedCategory: string
  selectedBrands: string[]
}

const Filters = ({
  clearAllFilters,
  handleCategoryChange,
  handleBrandChange,
  selectedCategory,
  selectedBrands,
}: FiltersProps) => {
  return (
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

      <ActiveFilters
        selectedCategory={selectedCategory}
        selectedBrands={selectedBrands}
        handleCategoryChange={handleCategoryChange}
        handleBrandChange={handleBrandChange}
      />

      {/* Categorías */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías</h3>
        <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
          <div className="space-y-2">
            {categories.map((category) => (
              <Field key={category} className="flex items-center">
                <Radio
                  value={category}
                  className="group flex size-4 items-center justify-center rounded-full border border-gray-300 bg-white data-[checked]:border-indigo-600"
                >
                  <span className="invisible size-2 rounded-full bg-indigo-600 group-data-[checked]:visible" />
                </Radio>
                <Label className="ml-2 text-sm text-gray-700 cursor-pointer">
                  {category}
                </Label>
              </Field>
            ))}
          </div>
        </RadioGroup>
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
    </>
  )
}

export default Filters
