import React from 'react'

import Container from './ui/Container'
import SubtitleAnimation from './SubtitleAnimation'
import LinkUi from './ui/LinkUi'

const Hero = () => {
  return (
    <Container tag="section" className="relative isolate">
      <div className="mx-auto max-w-3xl py-14">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Explora las categorias disponibles.{' '}
            <a href="#" className="font-semibold text-indigo-600">
              <span aria-hidden="true" className="absolute inset-0" />
              Leer mas <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Ana Vende,
          </h1>
          <SubtitleAnimation />
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
            <LinkUi variant="link" href={'r'}>
              Boton
            </LinkUi>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Hero
