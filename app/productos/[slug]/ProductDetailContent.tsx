'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FavouriteIcon,
  ShoppingCart01Icon,
  MinusSignIcon,
  PlusSignIcon,
  Share08Icon,
  ArrowLeft01Icon,
  CreditCardIcon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ButtonUi from '@/components/ui/ButtonUi'
//import ProductCard from '@/components/ProductCard'

import { SimpleProduct } from '@/interfaces/products'

interface Props {
  product: SimpleProduct
}

export default function ProductDetailContent({ product }: Props) {
  const [selectedStockIndex, setSelectedStockIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const selectedStock = product.stock[selectedStockIndex]
  const availableQuantity = selectedStock.quantity
  const currentImages = selectedStock.images
  const inStock = availableQuantity > 0

  // Calcular precio con descuento si aplica
  const finalPrice = useMemo(() => {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100)
    }
    return product.price
  }, [product.price, product.discount])

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment' && quantity < availableQuantity) {
      setQuantity(quantity + 1)
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleStockChange = (index: number) => {
    setSelectedStockIndex(index)
    setSelectedImageIndex(0)
    setQuantity(1)
  }

  return (
    <main>
      <Breadcrumbs
        links={[
          { href: '/productos', label: 'Productos' },
          {
            href: `/categorias/${product.categories[0]?.slug}`,
            label: product.categories[0]?.name || 'Sin Categoría',
          },
          { href: '#', label: product.name },
        ]}
      />

      <Container tag="section" className="mt-8">
        {/* Botón de volver */}
        <div className="mb-6">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#832833] transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            <span>Volver a productos</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="flex gap-4">
            {/* Miniaturas */}
            <div className="flex flex-col gap-2">
              {currentImages.map((image, index) => (
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
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Imagen principal */}
            <div className="flex-1 max-w-lg">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                {currentImages.length > 0 && (
                  <Image
                    src={currentImages[selectedImageIndex].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                {product.discount && product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    -{product.discount}%
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Nuevo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              {/* Categoría, marca y botones de acción superior */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#4A90A4] text-white text-xs px-2.5 py-0.5 rounded-sm">
                    {product.categories[0]?.name || 'Sin Categoría'}
                  </span>
                  <span className="text-gray-500 text-sm">
                    por {product.brand.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <HugeiconsIcon icon={FavouriteIcon} size={20} />
                  </button>
                  <button className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <HugeiconsIcon icon={Share08Icon} size={20} />
                  </button>
                </div>
              </div>

              {/* Título */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-pretty">
                {product.name}
              </h1>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  inStock ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span
                className={`text-sm ${
                  inStock ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {inStock
                  ? `En stock (${availableQuantity} disponibles)`
                  : 'Sin stock'}
              </span>
            </div>

            {/* Precio */}
            <div className="flex items-center gap-3">
              <span className="text-4xl text-[#832833]">
                ${finalPrice.toFixed(2)}
              </span>
              {product.discount && product.discount > 0 ? (
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              ) : null}
            </div>

            {/* Link para medios de pago */}
            <div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium underline transition-colors cursor-pointer"
              >
                Ver medios de pago disponibles
              </button>
            </div>

            {/* Colores */}
            {product.stock.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Color:</h3>
                <div className="flex gap-2">
                  {product.stock.map((stock, index) => {
                    const colors = stock.colors
                    const isSelected = selectedStockIndex === index

                    return (
                      <button
                        key={stock.id}
                        onClick={() => handleStockChange(index)}
                        className={`w-8 h-8 rounded-full border-2 relative overflow-hidden ${
                          isSelected
                            ? 'border-[#832833] ring-2 ring-[#832833]/20'
                            : 'border-gray-300'
                        }`}
                        title={colors.map((c) => c.name).join(' / ')}
                      >
                        {colors.length === 1 && (
                          <div
                            className="w-full h-full"
                            style={{ backgroundColor: colors[0].hex }}
                          />
                        )}
                        {colors.length === 2 && (
                          <>
                            <div
                              className="absolute inset-0 w-1/2"
                              style={{ backgroundColor: colors[0].hex }}
                            />
                            <div
                              className="absolute inset-0 left-1/2 w-1/2"
                              style={{ backgroundColor: colors[1].hex }}
                            />
                          </>
                        )}
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Cantidad y botón de compra */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Cantidad:</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HugeiconsIcon icon={MinusSignIcon} size={16} />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    disabled={quantity >= availableQuantity}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HugeiconsIcon icon={PlusSignIcon} size={16} />
                  </button>
                </div>
                <ButtonUi
                  color="merlot"
                  className="flex-1 flex items-center justify-center gap-2"
                  disabled={!inStock}
                >
                  <HugeiconsIcon icon={ShoppingCart01Icon} size={20} />
                  Añadir al carrito
                </ButtonUi>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción detallada */}
        <div className="mt-16 space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Descripción del producto
            </h3>
            <div className="space-y-6">
              <div className="text-gray-600 leading-relaxed text-lg prose prose-gray max-w-none">
                <BlocksRenderer content={product.description} />
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {/*<div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>*/}
      </Container>

      {/* Modal de medios de pago */}
      <Dialog
        open={showPaymentModal}
        onClose={setShowPaymentModal}
        className="relative z-50"
      >
        {/* Overlay */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-out data-closed:opacity-0"
        />

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Medios de pago disponibles
                </DialogTitle>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Tarjetas de crédito y débito */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <HugeiconsIcon icon={CreditCardIcon} size={20} />
                    Tarjetas de crédito y débito
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Visa, Mastercard, American Express</p>
                    <p>• Hasta 12 cuotas sin interés</p>
                    <p>• Débito inmediato</p>
                  </div>
                </div>

                {/* Transferencias bancarias */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Transferencias bancarias
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Transferencia bancaria tradicional</p>
                    <p>• Mercado Pago</p>
                    <p>• 10% de descuento por transferencia</p>
                  </div>
                </div>

                {/* Billeteras digitales */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Billeteras digitales
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Mercado Pago</p>
                    <p>• Ualá</p>
                    <p>• Modo</p>
                  </div>
                </div>

                {/* Efectivo */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Efectivo</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Pago en efectivo al retirar</p>
                    <p>• RapiPago y PagoFácil</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <ButtonUi
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full"
                  color="merlot"
                >
                  Cerrar
                </ButtonUi>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </main>
  )
}
