import React, { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { CreditCardIcon, Cancel01Icon } from '@hugeicons/core-free-icons'

import ButtonUi from '@/components/ui/ButtonUi'

const PaymentMethods = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  return (
    <div>
      <button
        onClick={() => setShowPaymentModal(true)}
        className="text-blue-500 hover:text-blue-700 text-sm font-medium underline transition-colors cursor-pointer"
      >
        Ver medios de pago disponibles
      </button>
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
    </div>
  )
}

export default PaymentMethods
