/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import Container from '@/components/ui/Container'
import ButtonUi from '@/components/ui/ButtonUi'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ShippingCalculator from './components/ShippingCalculator'
import type { ShippingInfo } from '@/store/shipping'

import useShoppingCartStore from '@/store/shoppingCart'
import useSettingsStore from '@/store/settings'
import ShoppingTable from './components/ShoppingTable'

const ShoppingCartContent = () => {
  const [buyerName, setBuyerName] = useState('')
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>(
    'pickup'
  )
  const [currentShipping, setCurrentShipping] = useState<ShippingInfo | null>(
    null
  )

  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart)
  const phoneNumber = useSettingsStore((state) => state.settings?.phone)

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

    const baseUrl = process.env.NEXT_PUBLIC_URL
    let message = `¡Hola! Soy *${buyerName}* y quiero realizar una compra:\n\n`

    message += '*PRODUCTOS:*\n'
    shoppingCart.items.forEach((item) => {
      message += `${item.quantity} x ${item.name.toUpperCase()}\n`
      message += `Precio: $${item.price.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}\n`
      message += `URL: ${baseUrl}/productos/${item.slug}\n\n`
    })

    message += `━━━━━━━━━━━━━━━━\n`
    message += `*Subtotal:* $${shoppingCart.totalPrice.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}\n`

    if (shippingMethod === 'delivery' && currentShipping) {
      message += `*Dirección de envío:* ${currentShipping.address}\n`
      if (currentShipping.cost > 0) {
        message += `*Envío (${
          currentShipping.zone
        }):* $${currentShipping.cost.toLocaleString('es-AR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}\n`
        message += `*TOTAL:* $${totalWithShipping.toLocaleString('es-AR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}\n`
      } else {
        message += `*Envío:* A coordinar\n`
        message += `*TOTAL:* $${shoppingCart.totalPrice.toLocaleString(
          'es-AR',
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        )} + envío\n`
      }
    } else {
      message += `*Método de entrega:* Retiro en local\n`
      message += `*TOTAL:* $${shoppingCart.totalPrice.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}\n`
    }

    message += `━━━━━━━━━━━━━━━━\n\n`
    message += `_Acepto los términos y condiciones_`

    // Usar API de WhatsApp para detectar automáticamente app/web/móvil
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`
  }

  const isCheckoutDisabled =
    !buyerName.trim() ||
    shoppingCart.items.length === 0 ||
    (shippingMethod === 'delivery' && !currentShipping)

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
            <div className="lg:col-span-2">
              <ShoppingTable />
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
