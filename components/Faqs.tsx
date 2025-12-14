'use client'

import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
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
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <Disclosure
          key={faq.id}
          as="div"
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <DisclosureButton className="group w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors">
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
              className="text-gray-500 flex-shrink-0 transition-transform duration-200 group-data-open:rotate-180"
            />
          </DisclosureButton>
          <DisclosurePanel
            transition
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
        </Disclosure>
      ))}
    </div>
  )
}

export default Faqs
