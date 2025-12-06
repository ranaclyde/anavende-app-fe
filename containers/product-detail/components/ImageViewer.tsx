import React from 'react'
import Image from 'next/image'

import { type ProductImage } from '@/interfaces/products'

interface ImageViewerProps {
  images: ProductImage[]
  productName: string
  discount?: number
  isNew?: boolean
  setSelectedImageIndex: (index: number) => void
  selectedImageIndex: number
}

const ImageViewer = ({
  images,
  productName,
  discount,
  isNew,
  setSelectedImageIndex,
  selectedImageIndex,
}: ImageViewerProps) => {
  return (
    <div className="flex gap-4">
      {/* Miniaturas */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onMouseEnter={() => setSelectedImageIndex(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImageIndex === index
                ? 'border-[#832833]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={image.url}
              alt={`${productName} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagen principal */}
      <div className="flex-1 max-w-lg">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          {images.length > 0 && (
            <Image
              src={images[selectedImageIndex].url}
              alt={productName}
              fill
              className="object-cover"
              priority
            />
          )}
          {discount && discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
              -{discount}%
            </div>
          )}
          {isNew && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
              Nuevo
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageViewer
