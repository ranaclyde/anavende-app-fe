'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import ButtonUi from '@/components/ui/ButtonUi'

import usePaymentMethodStore from '@/store/paymentMethods'

const PaymentMethods = () => {
  const { paymentMethods, getPaymentMethods } = usePaymentMethodStore()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!paymentMethods?.id) {
        try {
          setIsLoading(true)
          await getPaymentMethods()
        } catch (error) {
          console.log('Error fetching payment methods:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchPaymentMethods()
  }, [])

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

              <div className="[&>ul]:list-disc [&>ul>li]:ml-6">
                <BlocksRenderer content={paymentMethods.description} />
              </div>

              <div className="pt-4 border-t border-gray-200">
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
