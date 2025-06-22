import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ShoppingCart from '../icons/ShoppingCart'
import Search from '../icons/Search'
import Menu from '../icons/Menu'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <Menu width={20} height={20} className="w-6 h-6" />
          </button>
          <div className="flex items-center">
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
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-[#832833] transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/products"
              className="text-gray-900 hover:text-[#832833] transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/shop"
              className="text-gray-900 hover:text-[#832833] transition-colors"
            >
              Categorias
            </Link>
            <Link
              href="/blog"
              className="text-gray-900 hover:text-[#832833] transition-colors"
            >
              Destacados
            </Link>
            <Link
              href="/contact"
              className="text-gray-900 hover:text-[#832833] transition-colors"
            >
              Contacto
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 p-2 cursor-pointer"
            >
              <Search />
            </button>
            <button
              type="button"
              className="hidden md:block text-gray-600 hover:text-gray-900 p-2 cursor-pointer"
            >
              <ShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
