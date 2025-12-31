import React, { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  CloseButton,
} from '@headlessui/react'
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

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
  const [isCarouselOpen, setIsCarouselOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  const MAX_THUMBNAILS = 4
  const visibleThumbnails = images.slice(0, MAX_THUMBNAILS)
  const remainingCount = Math.max(0, images.length - MAX_THUMBNAILS)

  const openCarousel = (index: number) => {
    setCarouselIndex(index)
    setIsCarouselOpen(true)
  }

  const nextImage = () => {
    setCarouselIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCarouselIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextMobileImage = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % images.length)
  }

  const prevMobileImage = () => {
    setSelectedImageIndex(
      (selectedImageIndex - 1 + images.length) % images.length
    )
  }

  // Manejo unificado de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (isModal: boolean = false) => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isModal) {
      // Swipe en el modal
      if (isLeftSwipe) nextImage()
      if (isRightSwipe) prevImage()
    } else {
      // Swipe en el carrusel principal
      if (isLeftSwipe) nextMobileImage()
      if (isRightSwipe) prevMobileImage()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <>
      {/* Desktop: Miniaturas + Imagen principal */}
      <div className="hidden md:flex gap-4">
        {/* Miniaturas */}
        <div className="flex flex-col gap-2">
          {visibleThumbnails.map((image, index) => (
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

          {/* Miniatura +N */}
          {remainingCount > 0 && (
            <button
              onClick={() => openCarousel(MAX_THUMBNAILS)}
              className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors bg-gray-200 cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-white font-semibold text-lg">
                  +{remainingCount}
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Imagen principal */}
        <div className="flex-1 max-w-lg">
          <button
            onClick={() => openCarousel(selectedImageIndex)}
            className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 w-full cursor-pointer hover:opacity-95 transition-opacity"
          >
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
          </button>
        </div>
      </div>

      {/* Mobile: Carrusel con dots */}
      <div className="md:hidden">
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => handleTouchEnd(false)}
        >
          <button
            onClick={() => openCarousel(selectedImageIndex)}
            className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100"
          >
            {images.length > 0 && (
              <Image
                src={images[selectedImageIndex].url}
                alt={productName}
                fill
                className="object-contain"
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
          </button>
        </div>

        {/* Dots indicadores */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImageIndex
                    ? 'bg-[#832833] w-6'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Carrusel Modal con Dialog de Headless UI */}
      <Dialog
        open={isCarouselOpen}
        onClose={() => setIsCarouselOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop - Overlay oscuro */}
        <DialogBackdrop className="fixed inset-0 bg-black/90" />

        {/* Contenedor centrado */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* Botón cerrar - en la esquina superior derecha de la pantalla */}
          <CloseButton className="fixed top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors z-50 cursor-pointer">
            <HugeiconsIcon icon={Cancel01Icon} size={32} strokeWidth={2} />
          </CloseButton>

          <DialogPanel className="relative w-full h-full md:w-auto md:h-auto">

            {/* Contenedor del carrusel - Desktop */}
            <div className="hidden md:flex relative items-center justify-center gap-8">
              {/* Flecha izquierda - fuera de la imagen */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="text-white hover:bg-white/10 rounded-full p-3 transition-colors shrink-0 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={40}
                  strokeWidth={2}
                />
              </button>

              {/* Contenedor de imagen y contador */}
              <div className="relative">
                {/* Imagen del carrusel */}
                <div className="relative w-200 h-150 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                  <Image
                    src={images[carouselIndex].url}
                    alt={`${productName} ${carouselIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Contador de imágenes */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                  {carouselIndex + 1} / {images.length}
                </div>
              </div>

              {/* Flecha derecha - fuera de la imagen */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="text-white hover:bg-white/10 rounded-full p-3 transition-colors shrink-0 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={40}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Contenedor del carrusel - Mobile (ocupa todo el alto) */}
            <div className="md:hidden flex flex-col w-full h-full">
              {/* Contador en la parte superior */}
              <div className="flex justify-center py-4">
                <div className="text-white bg-black/50 px-4 py-2 rounded-full">
                  {carouselIndex + 1} / {images.length}
                </div>
              </div>

              {/* Imagen ocupando todo el espacio disponible con swipe */}
              <div 
                className="flex-1 relative flex items-center justify-center px-4"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(true)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={images[carouselIndex].url}
                    alt={`${productName} ${carouselIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Dots en la parte inferior */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 py-6">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCarouselIndex(index)}
                      className={`rounded-full transition-all ${
                        index === carouselIndex
                          ? 'bg-white w-8 h-2'
                          : 'bg-white/50 w-2 h-2'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default ImageViewer
