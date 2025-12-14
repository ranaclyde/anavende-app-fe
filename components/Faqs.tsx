'use client'

import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowDown01Icon,
  MessageQuestionIcon,
  MessageMultiple02Icon,
} from '@hugeicons/core-free-icons'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import { FAQ } from '@/interfaces/faqs'

interface FaqsProps {
  faqs: FAQ[]
}

const Faqs = ({ faqs }: FaqsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <Disclosure
          key={faq.id}
          as="div"
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          {({ open }) => {
            const isOpen = openIndex === index

            // Si se abre esta pregunta, cerrar la anterior
            if (open && !isOpen) {
              handleToggle(index)
            }

            return (
              <>
                <DisclosureButton
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => handleToggle(index)}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 bg-merlot-50 rounded-full flex items-center justify-center">
                      <HugeiconsIcon
                        icon={MessageQuestionIcon}
                        size={20}
                        className="text-merlot"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 pt-1.5">
                      {faq.question}
                    </h3>
                  </div>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={20}
                    className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </DisclosureButton>

                <Transition
                  show={isOpen}
                  enter="transition duration-200 ease-out"
                  enterFrom="transform opacity-0 -translate-y-2"
                  enterTo="transform opacity-100 translate-y-0"
                  leave="transition duration-150 ease-out"
                  leaveFrom="transform opacity-100 translate-y-0"
                  leaveTo="transform opacity-0 -translate-y-2"
                >
                  <DisclosurePanel
                    static
                    className="px-6 pb-4 border-t border-gray-100"
                  >
                    <div className="flex items-start gap-4 pt-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-hippie-blue-50 rounded-full flex items-center justify-center">
                        <HugeiconsIcon
                          icon={MessageMultiple02Icon}
                          size={20}
                          className="text-hippie-blue"
                        />
                      </div>
                      <div className="flex-1 pt-1.5 prose prose-sm max-w-none">
                        <BlocksRenderer content={faq.answer} />
                      </div>
                    </div>
                  </DisclosurePanel>
                </Transition>
              </>
            )
          }}
        </Disclosure>
      ))}
    </div>
  )
}

export default Faqs
