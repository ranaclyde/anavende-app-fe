import React, { useEffect } from 'react'
import { Checkbox, Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { useShallow } from 'zustand/shallow'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import useCategoryStore from '@/store/categories'
import useBrandStore from '@/store/brands'

const Filters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentBrandParam = searchParams.get('brand') ?? 'all'
  const currentCategoryParam = searchParams.get('category') ?? 'all'

  const { categories, getCategories } = useCategoryStore(
    useShallow((state) => ({
      categories: state.categories,
      getCategories: state.getCategories,
    }))
  )

  const { brands, getBrands } = useBrandStore(
    useShallow((state) => ({
      brands: state.brands,
      getBrands: state.getBrands,
    }))
  )

  useEffect(() => {
    if (categories.length === 0) {
      getCategories()
    }
  }, [categories.length, getCategories])

  useEffect(() => {
    if (brands.length === 0) {
      getBrands()
    }
  }, [brands.length, getBrands])

  const clearAllFilters = () => {
    router.push(pathname)
  }

  const selectedCategory =
    currentCategoryParam === 'all' ? '' : currentCategoryParam

  const selectedBrands =
    currentBrandParam === 'all'
      ? []
      : currentBrandParam.split(',').filter((b) => b.trim() !== '')

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', categorySlug)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleBrandChange = (brandName: string) => {
    const params = new URLSearchParams(searchParams.toString())
    let updatedBrands = selectedBrands.slice()

    if (updatedBrands.includes(brandName)) {
      updatedBrands = updatedBrands.filter((b) => b !== brandName)
    } else {
      updatedBrands.push(brandName)
    }

    if (updatedBrands.length > 0) {
      params.set('brand', updatedBrands.join(','))
    } else {
      params.delete('brand')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

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

      {/* Categorías */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías</h3>
        <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
          <div className="space-y-2">
            {categories.map((category) => (
              <Field key={category.id} className="flex items-center">
                <Radio
                  value={category.slug}
                  className="group flex size-4 items-center justify-center rounded-full border border-gray-300 bg-white data-[checked]:border-indigo-600"
                >
                  <span className="invisible size-2 rounded-full bg-indigo-600 group-data-[checked]:visible" />
                </Radio>
                <Label className="ml-2 text-sm text-gray-700 cursor-pointer">
                  {category.name}
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
            <Field key={brand.id} className="flex items-center">
              <Checkbox
                checked={selectedBrands.includes(brand.slug)}
                onChange={() => handleBrandChange(brand.slug)}
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
                {brand.name}
              </Label>
            </Field>
          ))}
        </div>
      </div>
    </>
  )
}

export default Filters
