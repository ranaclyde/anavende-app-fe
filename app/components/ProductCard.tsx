/* eslint-disable @next/next/no-img-element */
import React from 'react'

const ProductCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100 p-2 sm:p-4">
        <img
          src="https://ext.same-assets.com/3455407330/2011930931.png"
          alt="Gaming Headphone"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-3 sm:p-4">
        <span className="text-xs text-gray-500 uppercase">Kids</span>
        <h3 className="font-medium text-gray-900 mt-1 mb-2 text-sm sm:text-base line-clamp-2">
          Gaming Headphone
        </h3>
        <p className="text-sm sm:text-lg font-bold text-gray-900">$130.00</p>
      </div>
    </div>
  )
}

export default ProductCard
