import React, { Suspense } from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Loader } from '@/components/layout/Loader'

import type { CustomPage } from '@/interfaces/customPage'

interface TyCContentProps {
  tyc: CustomPage
}

const TyCContent = ({ tyc }: TyCContentProps) => {
  return (
    <>
      <Breadcrumbs links={[{ href: '#', label: 'Términos y Condiciones' }]} />
      <Container tag="section" className="mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Lee los términos y condiciones que rigen el uso de nuestros
            productos y servicios
          </p>
        </div>
        <Suspense
          fallback={<Loader message="Cargando términos y condiciones..." />}
        >
          <div className="[&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg text-gray-900">
            <BlocksRenderer content={tyc.description} />
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
    </>
  )
}

export default TyCContent
