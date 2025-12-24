'use client'
import React from 'react'
import { useShallow } from 'zustand/shallow'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Delete02Icon,
  MinusSignIcon,
  PlusSignIcon,
} from '@hugeicons/core-free-icons'

import useShoppingCartStore from '@/store/shoppingCart'

const ShoppingTable = () => {
  const { shoppingCart, incrementQuantity, decrementQuantity, removeItem } =
    useShoppingCartStore(
      useShallow((state) => ({
        shoppingCart: state.shoppingCart,
        incrementQuantity: state.incrementQuantity,
        decrementQuantity: state.decrementQuantity,
        removeItem: state.removeItem,
      }))
    )

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200">
        <div className="col-span-5 text-sm font-medium text-gray-700">
          Producto
        </div>
        <div className="col-span-3 text-sm font-medium text-gray-700 text-center">
          Precio
        </div>
        <div className="col-span-3 text-sm font-medium text-gray-700 text-center">
          Cantidad
        </div>
        <div className="col-span-1"></div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-200">
        {shoppingCart.items.map((item) => (
          <div
            key={item.productId}
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-white"
          >
            {/* Product Info */}
            <div className="col-span-5 flex items-center gap-4">
              <img
                src={item.imagenUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md bg-gray-100"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Color: {item.colors.map((color) => color.name).join('/')}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-3 text-center">
              <p className="text-base font-medium text-gray-900">
                $
                {item.price.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            {/* Quantity */}
            <div className="col-span-3 flex items-center justify-center gap-2">
              <div
                className="inline-flex rounded-lg shadow-xs -space-x-px border border-gray-300 justify-center items-center px-2 py-1.5"
                role="group"
              >
                <button
                  type="button"
                  className="w-5 h-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => decrementQuantity(item.productId)}
                  disabled={item.quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  <HugeiconsIcon
                    icon={MinusSignIcon}
                    size={15}
                    strokeWidth={2}
                  />
                </button>
                <span className="inline-flex items-center justify-center text-body leading-5 w-12">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  className="w-5 h-5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => incrementQuantity(item.productId)}
                  disabled={item.quantity >= item.maxStock}
                  aria-label="Aumentar cantidad"
                >
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={15}
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>

            {/* Remove */}
            <div className="col-span-1 flex justify-end">
              <button
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                onClick={() => removeItem(item.productId)}
                aria-label="Eliminar producto"
              >
                <HugeiconsIcon icon={Delete02Icon} size={18} strokeWidth={2} />
                <span className="hidden sm:inline">Eliminar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Cart Button */}
      <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end">
        <button
          className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          onClick={() => {
            if (
              window.confirm('¿Estás seguro de que quieres vaciar el carrito?')
            ) {
              shoppingCart.items.forEach((item) => removeItem(item.productId))
            }
          }}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  )
}

export default ShoppingTable
