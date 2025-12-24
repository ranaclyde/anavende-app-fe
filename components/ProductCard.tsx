'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { SimpleProduct } from '@/interfaces/products'

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
      <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={firstImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Color swatches over image: one per stock. If a stock has multiple colors, render split circle */}
        {product.stock && product.stock.length > 0 && (
          <div className="absolute bottom-2 left-2 z-20 bg-gray-50 rounded-md p-1 flex items-center gap-1">
            {product.stock.map((stock) => {
              const colors = stock.colors ?? []
              const first = colors[0]
              const second = colors[1]

              return (
                <div
                  key={stock.id}
                  className="w-6 h-6 rounded-full overflow-hidden border border-gray-200"
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

        {/* Botones de hover - corazón y carrito */}
        {/*<div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault()
              console.log('Añadir a favoritos')
            }}
            className="p-2 cursor-pointer bg-white/90 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              size={20}
              className="text-merlot"
              strokeWidth={1.5}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              console.log('Añadir al carrito')
            }}
            className="p-2 cursor-pointer bg-[hsla(0,0%,100%,.9)] rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <HugeiconsIcon
              icon={ShoppingCart01Icon}
              size={20}
              className="text-merlot"
              strokeWidth={1.5}
            />
          </button>
        </div>*/}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="w-fit bg-hippie-blue text-white text-xs px-2.5 py-0.5 rounded-sm">
            {categoryName}
          </span>
        </div>
        <h5 className="text-xs sm:text-sm lg:text-base font-medium text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
          {product.name}
        </h5>

        <div className="flex items-center justify-between">
          <p>
            <span className="text-xl font-semibold text-black-900">
              ${finalPrice.toFixed(2)}
            </span>
            {discounted && (
              <span className="ml-2 text-sm text-slate-500 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
