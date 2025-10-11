import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook02Icon, InstagramIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Container from '../ui/Container'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-8 lg:mt-16">
      <Container className="py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Ana vende logo"
                className="bg-white p-1 rounded"
                width={32}
                height={32}
                priority
              />
              <span className="hidden md:inline ml-2 text-xl font-bold text-[#832833]">
                Ana Vende
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              We are a team of designers and developers that create high quality
              WordPress
            </p>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HugeiconsIcon
                  icon={Facebook02Icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <HugeiconsIcon
                  icon={InstagramIcon}
                  size={24}
                  color="currentColor"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">My Account</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Talk To Us</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>Got Questions? Call us</p>
              <Link
                href="tel:670-413-90-762"
                className="text-white text-lg font-medium hover:text-blue-400 transition-colors block"
              >
                +670 413 90 762
              </Link>
              <div className="space-y-1">
                <Link
                  href="mailto:shofy@support.com"
                  className="block hover:text-white transition-colors"
                >
                  shofy@support.com
                </Link>
                <Link
                  href="/"
                  className="block hover:text-white transition-colors"
                >
                  79 Sleepy Hollow St. Jamaica, New York 1432
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © 2025 All Rights Reserved | Next js Template by{' '}
            <Link
              href="/"
              className="text-white hover:text-blue-400 transition-colors"
            >
              ThemePure
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
