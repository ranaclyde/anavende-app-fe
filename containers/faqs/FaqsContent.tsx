import React, { Suspense } from 'react'

import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Faqs from '@/components/Faqs'

import { FAQ } from '@/interfaces/faqs'

interface FaqsContentProps {
  faqs: FAQ[]
}

// TODO: Mejorar el loader
const Loader = () => {
  return <div>Cargando preguntas frecuentes...</div>
}

const FaqsContent = ({ faqs }: FaqsContentProps) => {
  return (
    <main>
      <Breadcrumbs links={[{ href: '#', label: 'Categorias' }]} />
      <Container tag="section" className="mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Encuentra respuestas a las preguntas más comunes sobre nuestros
            productos y servicios
          </p>
        </div>
        <Suspense fallback={<Loader />}>
          <Faqs faqs={faqs} />
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

export default FaqsContent
