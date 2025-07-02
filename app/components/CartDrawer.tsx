/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Cancel01Icon,
  Delete02Icon,
  MinusSignCircleIcon,
  PlusSignCircleIcon,
} from '@hugeicons/core-free-icons'
import ButtonUi from './ui/ButtonUi'

interface CartDrawerProps {
  visible: boolean
  onClose: () => void
}

const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
  const cart = [
    {
      id: 3,
      name: 'Zapatillas Deportivas',
      price: 89.99,
      image:
        'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg',
      quantity: 2,
    },
  ]

  return (
    <Dialog open={visible} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      {/* Drawer */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      strokeWidth={2}
                      className="size-6"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col bg-white shadow-xl">
                <DialogTitle className="text-base md:text-lg font-semibold text-gray-900 p-4 border-b-[0.5px] border-gray-300">
                  Tu Carrito
                </DialogTitle>
                <div className="relative flex-1 overflow-y-auto p-4">
                  {cart.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Tu carrito está vacío
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center py-4 border-b-[0.5px] border-gray-300"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </div>
                            <div className="font-medium text-blue-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <button className="text-gray-500 hover:text-blue-600">
                              <HugeiconsIcon
                                icon={MinusSignCircleIcon}
                                size={16}
                                color="currentColor"
                                strokeWidth={2}
                              />
                            </button>
                            <span className="mx-2 text-sm">
                              {item.quantity}
                            </span>
                            <button className="text-gray-500 hover:text-blue-600">
                              <HugeiconsIcon
                                icon={PlusSignCircleIcon}
                                size={16}
                                color="currentColor"
                                strokeWidth={2}
                              />
                            </button>
                            <button className="ml-auto text-red-500 hover:text-red-700">
                              <HugeiconsIcon
                                icon={Delete02Icon}
                                size={16}
                                color="currentColor"
                                strokeWidth={2}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t-[0.5px] border-gray-300">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <ButtonUi className="w-full">Proceder al Pago</ButtonUi>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default CartDrawer
