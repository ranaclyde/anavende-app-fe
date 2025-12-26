import ProductsContent from '@/containers/products/ProductsContent'
import { getProductsService } from '@/services/products'

const PAGE_SIZE = 12

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { isFeatured, category, brand, sort, page } = await searchParams

  const { products, pagination } = await getProductsService({
    isFeatured: isFeatured === 'true',
    category,
    brand,
    page,
    pageSize: PAGE_SIZE,
    sort,
  })

  return <ProductsContent products={products} pagination={pagination} />
}
