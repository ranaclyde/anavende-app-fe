import React from 'react'
import Link from 'next/link'

import Container from './ui/Container'
import SubtitleAnimation from './SubtitleAnimation'
import LinkUi from './ui/LinkUi'

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#020001] min-h-[500px] lg:min-h-[600px]">
      {/* Contenedor para la imagen que respeta el ancho del sitio */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <Container tag="div" className="w-full h-full relative">
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 xl:w-1/2">
            <img
              src="/images/setup-gamer.png"
              alt="Gaming setup with RGB lights"
              className="w-full h-full object-cover object-left"
            />
            {/* Degradados suaves para integración */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020001] via-[#020001]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020001]/70 via-transparent to-[#020001]/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#020001]/30 via-transparent to-[#020001]/70"></div>
          </div>
        </Container>
      </div>

      {/* Efecto de resplandor RGB de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-blue-900/10 blur-3xl z-0"></div>

      {/* Contenido */}
      <Container tag="div" className="relative z-10">
        <div className="max-w-2xl py-16 lg:py-24">
          <div className="mb-6">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-white bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
              Explora las categorias disponibles.{' '}
              <Link
                href="/categorias"
                className="ml-2 font-semibold hover:text-gray-200 transition-colors"
              >
                Leer mas <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-2xl">
            Ana Vende,
          </h1>
          <SubtitleAnimation />

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
            Tu tienda de confianza para productos de tecnologia y accesorios.
            Ofrecemos una amplia gama de productos de alta calidad a precios
            competitivos.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <LinkUi color="merlot" href={'/productos'}>
              Buscar productos
            </LinkUi>
            <span className="text-sm text-gray-400">
              Encontrá lo que necesitás
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
