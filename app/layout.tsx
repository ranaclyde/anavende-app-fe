import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

// Components
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SettingsProvider from '@/components/providers/SettingsProvider'

// Services
import { getSettingsService } from '@/services/settings'

// Styles
import '@/styles/globals.css'
import { Loader } from '@/components/layout/Loader'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ana Vende',
  description:
    'Tu tienda de confianza para productos de tecnología y accesorios',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Cargar settings antes de renderizar cualquier cosa
  const settings = await getSettingsService()

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loader message="Cargando configuración..." />}>
          <SettingsProvider settings={settings}>
            <Navbar />
            {children}
            <Footer />
          </SettingsProvider>
        </Suspense>
      </body>
    </html>
  )
}
