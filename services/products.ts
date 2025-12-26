import { getImageUrl, strapiQuery } from './strapi'
import { ProductSearchParams, type SimpleProduct } from '@/interfaces/products'
import { type Pagination } from '@/interfaces/pagination'
import {
  buildProductsQuery,
  buildProductsSearchQuery,
} from '@/utils/productParams'

export async function getProductsService(
  params: ProductSearchParams = {}
): Promise<{ products: SimpleProduct[]; pagination: Pagination }> {
  const searchQuery = buildProductsSearchQuery(params)
  const baseQuery = buildProductsQuery()

  const url = `products?${baseQuery}&${searchQuery}`

  const res = await strapiQuery(url)

  let productsResponse: SimpleProduct[] = []

  if (res.data || res.data.length > 0) {
    productsResponse = res.data.map((product: SimpleProduct) => {
      // Mapear las imágenes del stock como en getProductBySlugService

      const stock =
        product.stock?.map((stockItem) => {
          const images = stockItem.images?.map((img) => ({
            ...img,
            url: getImageUrl(img.url),
          }))

          return { ...stockItem, images }
        }) ?? []

      return {
        ...product,
        stock,
      }
    })
  }

  return {
    products: productsResponse,
    pagination: res.meta.pagination,
  }
}

export async function getProductBySlugService(
  slug: string
): Promise<SimpleProduct | null> {
  const res = await strapiQuery(
    `products?filters[slug][$eq]=${slug}&${buildProductsQuery()}`
  )

  const product = { ...res.data[0] } as SimpleProduct

  if (!product || Object.keys(product).length === 0) {
    return null
  }

  // Mapear URLs de imágenes
  product.stock = product.stock.map((stockItem) => {
    const images = stockItem.images.map((img) => ({
      ...img,
      url: getImageUrl(img.url),
    }))
    return { ...stockItem, images }
  })

  return product
}

export async function getFeaturedProductsService(): Promise<SimpleProduct[]> {
  const res = await strapiQuery(
    `products?filters[isHighlighted][$eq]=true&filters[isActive][$eq]=true&${buildProductsQuery()}&pagination[limit]=4`
  )

  let productsResponse: SimpleProduct[] = []

  if (res.data || res.data.length > 0) {
    productsResponse = res.data.map((product: SimpleProduct) => {
      const stock =
        product.stock?.map((stockItem) => {
          const images = stockItem.images?.map((img) => ({
            ...img,
            url: getImageUrl(img.url),
          }))

          return { ...stockItem, images }
        }) ?? []

      return {
        ...product,
        stock,
      }
    })
  }

  return productsResponse
}
