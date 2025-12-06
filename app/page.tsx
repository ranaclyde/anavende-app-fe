'use client'
// Libraries
import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

// Components
import GridCategorias from '@/components/GridCategories'
import ProductCard from '@/components/ProductCard'
import TitleDivider from '@/components/TitleDivider'
import Features from '@/components/Features'
import Container from '@/components/ui/Container'
import Brands from '@/components/Brands'
import Hero from '@/components/Hero'

// Store
import useCategoryStore from '@/store/categories'

export default function Home() {
  const { getHighlightedCategories, highlightedCategories } = useCategoryStore(
    useShallow((state) => ({
      getHighlightedCategories: state.getHighlightedCategories,
      highlightedCategories: state.highlightedCategories,
    }))
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      await getHighlightedCategories()
      setIsLoading(false)
    }
    if (!highlightedCategories.length) init()
  }, [])

  return (
    <main>
      <Hero />
      <Container tag="section">
        <Features />
      </Container>
      <Container tag="section" className="mt-16">
        <TitleDivider
          title="Productos destacados"
          btnText="Ver todos"
          href="/destacados"
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>

      <Brands />

      <Container tag="section" className="mt-16">
        <TitleDivider
          title="Categorias"
          btnText="Ver todas"
          href="/categorias"
        />
        <GridCategorias categories={highlightedCategories} />
      </Container>
    </main>
  )
}
