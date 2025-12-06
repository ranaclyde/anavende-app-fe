import { type SimpleProduct } from './../interfaces/products'
import { getImageUrl, strapiQuery } from './strapi'

// Helper para construir queries de Strapi más legibles
function buildProductsQuery(): string {
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

export async function getProductsService(): Promise<SimpleProduct[]> {
  const res = await strapiQuery(`products?${buildProductsQuery()}`)
  return res.data.map((product: any) => {
    const { name, slug, price, image: rawImage } = product
    const image = getImageUrl(rawImage.url)
    return { name, slug, price, image }
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
