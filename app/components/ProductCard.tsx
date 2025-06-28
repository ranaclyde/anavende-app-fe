import { EyeIcon, ShoppingCart01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import Image from 'next/image'

const ProductCard = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow">
      <a
        href="#"
        className="group relative w-full aspect-square overflow-hidden rounded-t-lg"
      >
        <Image
          src="/images/categories/headset.jpg"
          alt="Headset Nike Air MX Super 2500"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center justify-center h-full w-full flex-col text-center">
            <HugeiconsIcon
              icon={EyeIcon}
              size={24}
              color="#fff"
              strokeWidth={2}
            />
            <span className="mt-2 text-white text-sm sm:text-base">
              Ver detalles
            </span>
          </div>
        </div>
      </a>

      <div className="p-4 flex flex-col gap-2">
        <a href="#">
          <h5 className="text-xs sm:text-sm lg:text-base font-medium text-slate-900 leading-snug">
            Nike Air MX Super 2500 - Red
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-slate-900">$449</span>
            <span className="ml-2 text-sm text-slate-500 line-through">
              $699
            </span>
          </p>
        </div>
        <a
          href="#"
          className="hidden mt-2 sm:flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <HugeiconsIcon
            icon={ShoppingCart01Icon}
            size={20}
            color="currentColor"
            strokeWidth={2}
            className="mr-2"
          />
          Agregar al carrito
        </a>
      </div>
    </div>
  )
}

export default ProductCard
