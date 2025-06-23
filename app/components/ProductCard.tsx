/* eslint-disable @next/next/no-img-element */
import React from 'react'

const ProductCard = () => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-square bg-gray-100 p-2 sm:p-4 overflow-hidden">
        {/* Imagen */}
        <img
          src="https://ext.same-assets.com/3455407330/2011930931.png"
          alt="Gaming Headphone"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Oscurecimiento del contenedor */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Botones superpuestos */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-gray-900 font-medium text-sm sm:text-base px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">
            Agregar al carrito
          </button>
          <button className="text-white text-sm sm:text-base underline hover:text-gray-300 transition">
            Ver producto
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <span className="text-xs text-gray-500 uppercase">Auriculares</span>
        <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">
          Gaming Headphone
        </h3>
        <p className="text-sm sm:text-lg font-bold text-[#0989ff]">$130.00</p>
      </div>
    </div>
  )
}

export default ProductCard
