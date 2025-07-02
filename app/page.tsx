import GridCategorias from './components/GridCategories'
import ProductCard from './components/ProductCard'
import TitleDivider from './components/TitleDivider'
import Features from './components/Features'
import Container from './components/ui/Container'
import Brands from './components/Brands'
import Hero from './components/Hero'

export default function Home() {
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
        <GridCategorias />
      </Container>
      <Brands />
      <Container tag="section" className="mt-12">
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
    </main>
  )
}
