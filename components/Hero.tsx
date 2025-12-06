import React from 'react'
import Link from 'next/link'

import Container from './ui/Container'
import SubtitleAnimation from './SubtitleAnimation'
import LinkUi from './ui/LinkUi'

const Hero = () => {
  return (
    <Container tag="section" className="relative isolate">
      <div className="mx-auto max-w-3xl py-14">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20 bg-slate-50">
            Explora las categorias disponibles.{' '}
            <Link
              href="/categorias"
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span aria-hidden="true" className="absolute inset-0" />
              Leer mas <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Ana Vende,
          </h1>
          <SubtitleAnimation />
          <p className="mt-8 text-lg font-medium text-pretty text-slate-600 sm:text-xl/8">
            Tu tienda de confianza para productos de tecnologia y accesorios.
            <br />
            Ofrecemos una amplia gama de productos de alta calidad a precios
            competitivos.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <LinkUi color="merlot" href={'/productos'}>
              Buscar productos
            </LinkUi>
            <span className="text-sm text-slate-500">
              Encontrá lo que necesitás
            </span>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Hero
