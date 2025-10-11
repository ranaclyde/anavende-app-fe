import GridCategorias from '../components/GridCategories'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import { getCategories } from '../services/categories'

export default async function CategoriesPage() {
  const categories = await getCategories()
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
        <GridCategorias categories={categories} />
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
