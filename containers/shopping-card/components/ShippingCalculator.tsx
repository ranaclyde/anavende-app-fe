'use client'
import React, { useState } from 'react'
import clsx from 'clsx'

// Components
import ButtonUi from '@/components/ui/ButtonUi'

// Utils
import { calculateShippingFromAddress } from '@/utils/shippingCalculator'

// Types
import type { ShippingInfo } from '@/store/shipping'

interface ShippingCalculatorProps {
  onShippingChange: (
    method: 'pickup' | 'delivery',
    shippingInfo: ShippingInfo | null
  ) => void
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({
  onShippingChange,
}) => {
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>(
    'pickup'
  )
  const [shippingAddress, setShippingAddress] = useState('')
  const [currentShipping, setCurrentShipping] = useState<ShippingInfo | null>(
    null
  )
  const [isCalculating, setIsCalculating] = useState(false)
  const [shippingError, setShippingError] = useState('')

  const handleMethodChange = (method: 'pickup' | 'delivery') => {
    setShippingMethod(method)
    setCurrentShipping(null)
    setShippingAddress('')
    setShippingError('')
    onShippingChange(method, null)
  }

  const handleCalculateShipping = async () => {
    if (!shippingAddress.trim()) {
      setShippingError('Debes ingresar una dirección')
      return
    }

    setIsCalculating(true)
    setShippingError('')

    const result = await calculateShippingFromAddress(shippingAddress)

    if (result.success) {
      const shippingInfo: ShippingInfo = {
        address: shippingAddress,
        distance: result.distance!,
        cost: result.shippingCost!,
        zone: result.zoneLabel!,
      }
      setCurrentShipping(shippingInfo)
      setShippingError('')
      onShippingChange('delivery', shippingInfo)
    } else {
      // Si no se puede geocodificar, guardamos la dirección para coordinar por WhatsApp
      const manualShippingInfo: ShippingInfo = {
        address: shippingAddress,
        distance: 0,
        cost: 0,
        zone: 'A coordinar',
      }
      setCurrentShipping(manualShippingInfo)
      setShippingError(
        result.error ||
          'No se pudo calcular el envío. Lo coordinaremos por WhatsApp.'
      )
      onShippingChange('delivery', manualShippingInfo)
    }

    setIsCalculating(false)
  }

  return (
    <div>
      {/* Método de envío */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Método de entrega *
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="shippingMethod"
              value="pickup"
              checked={shippingMethod === 'pickup'}
              onChange={() => handleMethodChange('pickup')}
              className="w-4 h-4 text-[#722f37] focus:ring-[#722f37] border-gray-300"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              Retiro en local (gratis)
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="shippingMethod"
              value="delivery"
              checked={shippingMethod === 'delivery'}
              onChange={() => handleMethodChange('delivery')}
              className="w-4 h-4 text-[#722f37] focus:ring-[#722f37] border-gray-300"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              Envío a domicilio
            </span>
          </label>
        </div>
      </div>

      {/* Sección de envío */}
      {shippingMethod === 'delivery' && (
        <div className="mb-4 pb-4">
          {currentShipping ? (
            // Panel de resultado cuando ya se calculó el envío
            <div
              className={clsx(
                'p-3 bg-green-50 border border-green-200 rounded-md',
                shippingError && 'bg-orange-50 border-orange-200'
              )}
            >
              <p
                className={clsx(
                  'text-xs text-green-800 mb-1',
                  shippingError && 'text-orange-800'
                )}
              >
                <strong>Dirección:</strong> {currentShipping.address}
              </p>
              {currentShipping.distance > 0 && (
                <>
                  <p className="text-xs text-green-800 mb-1">
                    <strong>Distancia:</strong> {currentShipping.distance} km -{' '}
                    {currentShipping.zone}
                  </p>
                  <p className="text-xs text-green-700 italic mt-2">
                    * El precio del envío es una estimación aproximada y puede
                    variar.
                  </p>
                </>
              )}
              {shippingError && (
                <>
                  <p className="text-xs text-orange-800 mb-1">
                    {shippingError}
                  </p>
                  <p className="text-xs text-orange-700 italic mt-2">
                    * El costo se coordinará por WhatsApp
                  </p>
                </>
              )}
              <ButtonUi
                onClick={() => {
                  setCurrentShipping(null)
                  setShippingAddress('')
                  setShippingError('')
                  onShippingChange('delivery', null)
                }}
                color="info"
                variant="link"
                className="mt-2 px-0! text-xs"
              >
                Cambiar dirección
              </ButtonUi>
            </div>
          ) : (
            // Input de dirección cuando no se ha calculado
            <>
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Dirección de envío *
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => {
                    setShippingAddress(e.target.value)
                    setShippingError('')
                  }}
                  placeholder="Ej: Rivadavia 193, Patagones"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#722f37] focus:border-transparent outline-none transition-all text-sm"
                />
                <p className="text-xs text-gray-500">
                  Incluye la ciudad: Viedma, Carmen de Patagones, El Cóndor o
                  San Javier
                </p>
                <ButtonUi
                  color="hippie-blue"
                  onClick={handleCalculateShipping}
                  disabled={!shippingAddress.trim() || isCalculating}
                  className="w-full"
                  size="sm"
                >
                  {isCalculating ? 'Calculando...' : 'Calcular envío'}
                </ButtonUi>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ShippingCalculator
