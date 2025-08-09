'use client'

import { FavouriteIcon, ShoppingCart01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import Image from 'next/image'

const ProductCard = () => {
  return (
    <a
      href="#"
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
        <Image
          src="/images/categories/headset.jpg"
          alt="Headset Nike Air MX Super 2500"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Botones de hover - corazón y carrito */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => {
              console.log('Añadir a favoritos')
            }}
            className="p-2 cursor-pointer bg-white/90 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              size={20}
              className="text-indigo-600"
              strokeWidth={1.5}
            />
          </button>
          <button
            onClick={() => {
              console.log('Añadir al carrito')
            }}
            className="p-2 cursor-pointer bg-[hsla(0,0%,100%,.9)] rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <HugeiconsIcon
              icon={ShoppingCart01Icon}
              size={20}
              className="text-indigo-600"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <span className="w-fit bg-[#832833] text-white text-xs px-2.5 py-0.5 rounded-sm">
          Auriculares
        </span>
        <h5 className="text-xs sm:text-sm lg:text-base font-medium text-slate-900 leading-snug">
          Nike Air MX Super 2500 - Red
        </h5>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-xl font-semibold text-black-900">$449</span>
            <span className="ml-2 text-sm text-slate-500 line-through">
              $699
            </span>
          </p>
        </div>
      </div>
    </a>
  )
}

export default ProductCard
