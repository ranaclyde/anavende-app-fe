import type { ProductSearchParams } from '@/interfaces/products'

// Helper para construir queries de Strapi más legibles
export function buildProductsQuery(): string {
  const params = new URLSearchParams()

  // Campos básicos del producto
  params.append('fields[0]', 'name')
  params.append('fields[1]', 'slug')
  params.append('fields[2]', 'price')
  params.append('fields[3]', 'discount')
  params.append('fields[4]', 'isNew')
  params.append('fields[5]', 'isHighlighted')
  params.append('fields[6]', 'isActive')
  params.append('fields[7]', 'description')

  // Populate brand
  params.append('populate[brand][fields][0]', 'id')
  params.append('populate[brand][fields][1]', 'slug')
  params.append('populate[brand][fields][2]', 'name')

  // Populate categories
  params.append('populate[categories][fields][0]', 'id')
  params.append('populate[categories][fields][1]', 'slug')
  params.append('populate[categories][fields][2]', 'name')

  // Populate stock
  params.append('populate[stock][fields][0]', 'id')
  params.append('populate[stock][fields][1]', 'quantity')

  // Populate stock -> colors
  params.append('populate[stock][populate][colors][fields][0]', 'id')
  params.append('populate[stock][populate][colors][fields][1]', 'slug')
  params.append('populate[stock][populate][colors][fields][2]', 'name')
  params.append('populate[stock][populate][colors][fields][3]', 'hex')

  // Populate stock -> images
  params.append('populate[stock][populate][images][fields][0]', 'url')

  return params.toString()
}

// Filtros y parámetros para la búsqueda de productos
export function buildProductsSearchQuery(params: ProductSearchParams): string {
  const searchParams = new URLSearchParams()

  // --- Filtro por categoría ---
  if (params.category) {
    searchParams.append('filters[categories][slug][$eq]', params.category)
  }

  // --- Filtro por marca ---
  if (params.brand) {
    const brandList = Array.isArray(params.brand)
      ? params.brand
      : [params.brand]

    // $in recibe una lista separada por comas
    searchParams.append('filters[brand][slug][$in]', brandList.join(','))
  }

  // --- Buscador por texto ---
  if (params.search) {
    searchParams.append('filters[$or][0][name][$containsi]', params.search)
    searchParams.append(
      'filters[$or][1][description][$containsi]',
      params.search
    )
  }

  // --- Orden ---
  if (params.sort === 'recent') {
    searchParams.append('sort', 'createdAt:desc')
  }

  if (params.sort === 'price_asc') {
    searchParams.append('sort', 'price:asc')
  }

  if (params.sort === 'price_desc') {
    searchParams.append('sort', 'price:desc')
  }

  // --- Paginación ---
  if (params.page) {
    searchParams.append('pagination[page]', String(params.page))
  }

  if (params.pageSize) {
    searchParams.append('pagination[pageSize]', String(params.pageSize))
  }

  return searchParams.toString()
}
