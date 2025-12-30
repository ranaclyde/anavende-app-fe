import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/ProductCard'
import Pagination from './components/Pagination'
import Filters from './components/Filters'
import SortButton from './components/SortButton'
import SearchProductInput from './components/SearchProductInput'
import SidebarFilters from './components/SidebarFilters'

import { type SimpleProduct } from '@/interfaces/products'
import { type Pagination as PaginationType } from '@/interfaces/pagination'

interface ProductsContentProps {
  products?: SimpleProduct[]
  pagination?: PaginationType
}

const ProductsContent = ({
  products = [],
  pagination,
}: ProductsContentProps) => {
  return (
    <>
      <Breadcrumbs links={[{ href: '/productos', label: 'Productos' }]} />

      <Container tag="section" className="mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Sidebar - Filtros */}
          <SidebarFilters />

          {/* Desktop Sidebar - Filtros */}
          <aside className="hidden lg:block w-80">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Filters />
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de búsqueda y ordenamiento */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Buscador */}
                <SearchProductInput />
                {/* Ordenamiento */}
                <div className="sm:w-48">
                  <SortButton />
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            {products.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-sm text-gray-600">
                  No hay productos que coincidan con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Paginación (placeholder) */}
                <Pagination pagination={pagination} />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProductsContent
