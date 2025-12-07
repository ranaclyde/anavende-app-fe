import { getImageUrl, strapiQuery } from './strapi'
import { ProductSearchParams, type SimpleProduct } from '@/interfaces/products'
import {
  buildProductsQuery,
  buildProductsSearchQuery,
} from '@/utils/productParams'

export async function getProductsService(params: ProductSearchParams = {}) {
  const searchQuery = buildProductsSearchQuery(params)
  const baseQuery = buildProductsQuery()

  const url = `products?${baseQuery}&${searchQuery}`

  const res = await strapiQuery(url)

  return res.data.map((product: SimpleProduct) => {
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
