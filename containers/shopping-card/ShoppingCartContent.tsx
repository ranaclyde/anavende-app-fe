/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Delete02Icon,
  MinusSignCircleIcon,
  PlusSignCircleIcon,
} from '@hugeicons/core-free-icons'
import Link from 'next/link'

import Container from '@/components/ui/Container'
import ButtonUi from '@/components/ui/ButtonUi'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ShippingCalculator from './components/ShippingCalculator'
import type { ShippingInfo } from '@/store/shipping'

import useShoppingCartStore from '@/store/shoppingCart'

const ShoppingCartContent = () => {
  const [buyerName, setBuyerName] = useState('')
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>(
    'pickup'
  )
  const [currentShipping, setCurrentShipping] = useState<ShippingInfo | null>(
    null
  )

  const { shoppingCart, incrementQuantity, decrementQuantity, removeItem } =
    useShoppingCartStore(
      useShallow((state) => ({
        shoppingCart: state.shoppingCart,
        incrementQuantity: state.incrementQuantity,
        decrementQuantity: state.decrementQuantity,
        removeItem: state.removeItem,
      }))
    )

  const shippingCost =
    shippingMethod === 'delivery' && currentShipping ? currentShipping.cost : 0
  const totalWithShipping = shoppingCart.totalPrice + shippingCost

  const handleShippingChange = (
    method: 'pickup' | 'delivery',
    shippingInfo: ShippingInfo | null
  ) => {
    setShippingMethod(method)
    setCurrentShipping(shippingInfo)
  }

  const generateWhatsAppLink = () => {
    if (!buyerName.trim() || shoppingCart.items.length === 0) return '#'

    const phoneNumber = '5491134567890' // Reemplazar con el número real
    let message = `¡Hola! Soy *${buyerName}* y quiero realizar una compra:\n\n`

    shoppingCart.items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   - Cantidad: ${item.quantity}\n`
      message += `   - Precio unitario: $${item.price.toFixed(2)}\n`
      message += `   - Subtotal: $${(item.price * item.quantity).toFixed(
        2
      )}\n\n`
    })

    message += `*Subtotal productos: $${shoppingCart.totalPrice.toFixed(2)}*\n`

    if (shippingMethod === 'delivery' && currentShipping) {
      message += `*Dirección de envío:* ${currentShipping.address}\n`
      if (currentShipping.cost > 0) {
        message += `*Costo de envío:* $${currentShipping.cost.toFixed(2)} (${
          currentShipping.zone
        }${
          currentShipping.distance ? ` - ${currentShipping.distance} km` : ''
        })\n`
        message += `*Total con envío: $${totalWithShipping.toFixed(2)}*\n\n`
      } else {
        message += `*Costo de envío:* A coordinar\n\n`
      }
    } else {
      message += `*Total: $${shoppingCart.totalPrice.toFixed(2)}*\n`
      message += `*Retiro en local*\n\n`
    }

    message += `Acepto los términos y condiciones.`

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  const isCheckoutDisabled =
    !buyerName.trim() ||
    shoppingCart.items.length === 0 ||
    (shippingMethod === 'delivery' && !currentShipping)

  console.log('shippingMethod:', shippingMethod)

  return (
    <main>
      <Breadcrumbs links={[{ href: '#', label: 'Carrito' }]} />

      <Container tag="section" className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Carrito de Compras
        </h1>

        {shoppingCart.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>
            <Link
              href="/productos"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {shoppingCart.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors self-center"
                    onClick={() => removeItem(item.productId)}
                    aria-label="Eliminar producto"
                  >
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      size={20}
                      strokeWidth={2}
                    />
                  </button>
                  <img
                    src={item.imagenUrl}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Color: {item.colors.map((color) => color.name).join('/')}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          onClick={() => decrementQuantity(item.productId)}
                          disabled={item.quantity <= 1}
                          aria-label="Disminuir cantidad"
                        >
                          <HugeiconsIcon
                            icon={MinusSignCircleIcon}
                            size={20}
                            strokeWidth={2}
                          />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          onClick={() => incrementQuantity(item.productId)}
                          disabled={item.quantity >= item.maxStock}
                          aria-label="Aumentar cantidad"
                        >
                          <HugeiconsIcon
                            icon={PlusSignCircleIcon}
                            size={20}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} c/u
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen y checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Resumen de Compra
                </h2>

                {/* Componente de envío */}
                <ShippingCalculator onShippingChange={handleShippingChange} />

                {/* Resumen de precios */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal productos:</span>
                    <span>${shoppingCart.totalPrice.toFixed(2)}</span>
                  </div>
                  {shippingMethod === 'delivery' && (
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>
                        Envío
                        {currentShipping?.zone
                          ? ` (${currentShipping.zone})`
                          : ''}
                        :
                      </span>
                      <span>
                        {currentShipping?.cost && currentShipping.cost > 0
                          ? `$${currentShipping.cost.toFixed(2)}`
                          : 'A coordinar'}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-900 mt-3 pt-3 border-t border-gray-200">
                    <span>Total:</span>
                    <span>
                      {shippingMethod === 'delivery' &&
                      currentShipping?.cost === 0
                        ? `$${shoppingCart.totalPrice.toFixed(2)} + envío`
                        : `$${totalWithShipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Campo de nombre */}
                <div className="mb-4">
                  <label
                    htmlFor="buyerName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    id="buyerName"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#722f37] focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Botón de WhatsApp */}
                <ButtonUi
                  color="merlot"
                  className="w-full"
                  disabled={isCheckoutDisabled}
                  onClick={() => {
                    if (!isCheckoutDisabled) {
                      window.open(generateWhatsAppLink(), '_blank')
                    }
                  }}
                >
                  Finalizar compra por WhatsApp
                </ButtonUi>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Serás redirigido a WhatsApp para completar tu pedido
                </p>

                {/* Términos y condiciones */}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Al realizar la compra, aceptas nuestros{' '}
                  <Link
                    href="/terminos-y-condiciones"
                    target="_blank"
                    className="text-[#722f37] hover:text-[#8b3a44] underline font-medium"
                  >
                    términos y condiciones
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  )
}

export default ShoppingCartContent
