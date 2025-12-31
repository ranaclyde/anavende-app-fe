'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import type { SimpleProduct } from '@/interfaces/products'
import { formatPrice } from '@/utils/numbers'

interface Props {
  product: SimpleProduct
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const firstImage = product.stock?.[0]?.images?.[0]?.url

  const categoryName = product.categories?.[0]?.name ?? 'Sin categoría'

  const price = product.price
  const discounted = product.discount && product.discount > 0
  const finalPrice = discounted
    ? product.price * (1 - product.discount! / 100)
    : product.price

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-67.5 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
        <Image
          src={firstImage}
          alt={product.name}
          width={270}
          height={270}
          className="object-contain w-full h-full"
        />

        {/* Icono de vista en hover - semicírculo en el centro derecha */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white rounded-l-full py-4 pl-2 shadow-lg">
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={24}
              className="text-merlot"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Color swatches over image: one per stock. If a stock has multiple colors, render split circle */}
        {product.stock && product.stock.length > 0 && (
          <div className="absolute bottom-2 left-2 z-20 bg-gray-500 rounded-md p-1 flex items-center gap-1">
            {product.stock.map((stock) => {
              const colors = stock.colors ?? []
              const first = colors[0]
              const second = colors[1]

              return (
                <div
                  key={stock.id}
                  className="w-4 h-4 rounded-full overflow-hidden border border-gray-200"
                >
                  {colors.length <= 1 ? (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: first?.hex ?? '#ddd' }}
                    />
                  ) : (
                    <div className="flex w-full h-full">
                      <div
                        className="w-1/2 h-full"
                        style={{ backgroundColor: first?.hex ?? '#ddd' }}
                      />
                      <div
                        className="w-1/2 h-full"
                        style={{ backgroundColor: second?.hex ?? '#ccc' }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="p-2 md:p-4 flex flex-col gap-2">
        <span className="text-slate-600 text-xs">
          {categoryName}
        </span>
        <h5 className="text-xs sm:text-sm text-slate-900 leading-snug">
          {product.name}
        </h5>

        <div className="flex items-center justify-between">
          <p>
            <span className="text-xl font-semibold text-black-900">
              {formatPrice(finalPrice)}
            </span>
            {discounted !== 0 && (
              <span className="ml-2 text-sm text-slate-500 line-through">
                {formatPrice(price)}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
