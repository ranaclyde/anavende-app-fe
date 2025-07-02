import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import Image from 'next/image'

const categories = [
  {
    id: 1,
    name: 'Auriculares',
    image: '/images/categories/headphones.jpg',
    href: '/categorias/auriculares'
  },
  {
    id: 2,
    name: 'Headsets Gaming',
    image: '/images/categories/headset.jpg',
    href: '/categorias/headsets'
  },
  {
    id: 3,
    name: 'Mouses',
    image: '/images/categories/mouses.jpg',
    href: '/categorias/mouses'
  }
]

export default function CategoriesPage() {
  return (
    <main>
      <Breadcrumbs links={[{ href: '#', label: 'Categorias' }]} />
      <Container tag="section" className="mt-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="mt-4 text-lg text-gray-600">
            Descubre nuestras categorias de productos
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 text-center group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
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
