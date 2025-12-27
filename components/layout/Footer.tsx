'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Facebook02Icon,
  InstagramIcon,
  TiktokIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import Container from '../ui/Container'
import useSettingsStore from '@/store/settings'

const Footer = () => {
  const settings = useSettingsStore((state) => state.settings)

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
              Tu tienda de confianza para productos de tecnologia y accesorios
            </p>
            <div className="flex space-x-4">
              {settings?.facebook && (
                <Link
                  href={settings.facebook}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <HugeiconsIcon
                    icon={Facebook02Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </Link>
              )}
              {settings?.instagram && (
                <Link
                  href={settings.instagram}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <HugeiconsIcon
                    icon={InstagramIcon}
                    size={24}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </Link>
              )}
              {settings?.tiktok && (
                <Link
                  href={settings.tiktok}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <HugeiconsIcon
                    icon={TiktokIcon}
                    size={24}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </Link>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="hover:text-white transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="hover:text-white transition-colors"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?isFeatured=true"
                  className="hover:text-white transition-colors"
                >
                  Destacados
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-white transition-colors"
                >
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="hover:text-white transition-colors"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="hover:text-white transition-colors"
                >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-white transition-colors"
                >
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Habla con nosotros</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>¿Tienes preguntas? Llámanos</p>
              <Link
                href={`tel:${settings?.phone}`}
                className="text-white text-lg font-medium hover:text-blue-400 transition-colors block"
              >
                {settings?.phone}
              </Link>
              <div className="space-y-1">
                <Link
                  href={`mailto:${settings?.email}`}
                  className="block hover:text-white transition-colors"
                >
                  {settings?.email}
                </Link>
                <p className="block hover:text-white transition-colors">
                  Coordina una visita en Viedma, Río Negro
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © 2025 AnaVende |{' '}
            <Link
              href="https://www.linkedin.com/in/emanuel-sanhueza/"
              className="text-white hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matías Emanuel Sanhueza
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
