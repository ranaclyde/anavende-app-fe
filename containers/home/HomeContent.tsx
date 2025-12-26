import React from 'react'

// Components
import Features from '@/components/Features'
import GridCategorias from '@/components/GridCategories'
import Hero from '@/components/Hero'
import TitleDivider from '@/components/TitleDivider'
import Container from '@/components/ui/Container'
import Brands from '@/components/Brands'
import ProductCard from '@/components/ProductCard'

// Types
import { Category } from '@/interfaces/categories'
import { SimpleProduct } from '@/interfaces/products'

interface HomeContentProps {
  featuredCategories: Category[]
  featuredProducts: SimpleProduct[]
}

const HomeContent = ({
  featuredCategories,
  featuredProducts,
}: HomeContentProps) => {
  return (
    <main>
      <Hero />

      <Container tag="section">
        <Features />
      </Container>

      <Container tag="section" className="mt-16">
        <TitleDivider
          title="Categorias"
          btnText="Ver todas"
          href="/categorias"
        />
        <GridCategorias categories={featuredCategories} />
      </Container>

      <Brands />

      <Container tag="section" className="mt-16">
        <TitleDivider
          title="Productos destacados"
          btnText="Ver todos"
          href="/productos?isFeatured=true"
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </main>
  )
}

export default HomeContent
