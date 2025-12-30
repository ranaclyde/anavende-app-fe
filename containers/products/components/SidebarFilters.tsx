'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { FilterIcon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

// Components
import Filters from './Filters'

const SidebarFilters = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <HugeiconsIcon icon={FilterIcon} size={20} />
          <span>Filtros</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <Dialog
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:-translate-x-full"
              >
                <TransitionChild>
                  <div className="absolute top-0 right-0 -mr-8 flex pt-4 pl-2 duration-500 ease-in-out data-closed:opacity-0">
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Cerrar filtros</span>
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        strokeWidth={2}
                        className="size-6"
                      />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto p-6">
                    <Filters />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default SidebarFilters
