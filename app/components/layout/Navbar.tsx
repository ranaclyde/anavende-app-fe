'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Cancel01Icon,
  Menu01Icon,
  Search02Icon,
  ShoppingCart01Icon,
} from '@hugeicons/core-free-icons'

import Container from '../ui/Container'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import clsx from 'clsx'
import CartDrawer from '../CartDrawer'

const navigation = [
  { name: 'Productos', href: '/productos', current: false },
  { name: 'Categorias', href: '/categorias', current: false },
  { name: 'Destacados', href: '/destacados', current: false },
  { name: 'Contacto', href: '/contacto', current: false },
]

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <Disclosure
      as="header"
      className="bg-white border-b border-gray-200 sticky top-0 z-40"
    >
      <Container tag="nav">
        <div className="flex justify-between items-center h-16">
          <Link href={'/'} className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Shofy"
              className="h-8 w-auto"
              width={123}
              height={32}
              priority
            />
            <span className="hidden md:inline ml-2 text-xl font-bold text-[#832833]">
              Ana Vende
            </span>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navigation.map((nav) => (
              <Link
                key={nav.name}
                href={nav.href}
                className="text-gray-900 hover:text-[#832833] transition-colors"
              >
                {nav.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer"
            >
              <HugeiconsIcon
                icon={Search02Icon}
                size={24}
                color="currentColor"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              className="relative hidden md:block text-gray-600 hover:text-gray-900 p-2 cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <HugeiconsIcon
                icon={ShoppingCart01Icon}
                size={24}
                color="currentColor"
                strokeWidth={2}
              />
              <span className="absolute -top-0 -right-1 bg-red-500 text-white rounded-full text-xs flex items-center justify-center h-5 w-5">
                0
              </span>
            </button>
            {/* Mobile menu button*/}
            <DisclosureButton className="group md:hidden rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <HugeiconsIcon
                icon={Menu01Icon}
                strokeWidth={2}
                className="block size-6 group-data-open:hidden"
              />
              <HugeiconsIcon
                icon={Cancel01Icon}
                strokeWidth={2}
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </Container>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={clsx(
                item.current
                  ? 'text-[#832833]'
                  : 'text-gray-900 hover:text-[#832833] transition-colors',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
      <CartDrawer visible={cartOpen} onClose={() => setCartOpen(false)} />
    </Disclosure>
  )
}

export default Navbar
