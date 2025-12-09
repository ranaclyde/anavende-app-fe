import React, { Suspense } from 'react'

// Components
import GridCategorias from '@/components/GridCategories'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Container from '@/components/ui/Container'

// Types
import type { Category } from '@/interfaces/categories'

interface CategoriesContentProps {
  categories: Category[]
}

// TODO: Mejorar el loader
const Loader = () => {
  return <div>Cargando categorias...</div>
}

const CategoriesContent = ({ categories }: CategoriesContentProps) => {
  return (
    <main>
      <Breadcrumbs links={[{ href: '#', label: 'Categorias' }]} />
      <Container tag="section" className="mt-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="mt-4 text-lg text-gray-600">
            Descubre nuestras categorias de productos
          </p>
        </div>
        <Suspense fallback={<Loader />}>
          <GridCategorias categories={categories} />
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

export default CategoriesContent
