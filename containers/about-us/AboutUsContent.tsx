import React, { Suspense } from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

import type { CustomPage } from '@/interfaces/customPage'

interface AboutUsContentProps {
  aboutUs: CustomPage
}

// TODO: Mejorar el loader
const Loader = () => {
  return <div>Cargando acerca de nosotros...</div>
}

const AboutUsContent = ({ aboutUs }: AboutUsContentProps) => {
  return (
    <main>
      <Breadcrumbs links={[{ href: '#', label: 'Acerca de Nosotros' }]} />
      <Container tag="section" className="mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Acerca de Nosotros
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Conoce más sobre nuestra misión, visión y los valores que nos
            impulsan a ofrecerte los mejores productos y servicios
          </p>
        </div>
        <Suspense fallback={<Loader />}>
          <div className="[&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg text-gray-900">
            <BlocksRenderer content={aboutUs.description} />
          </div>
        </Suspense>
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            No encuentras lo que buscas?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Contactanos
            </a>
          </p>
        </div>
      </Container>
    </main>
  )
}

export default AboutUsContent
