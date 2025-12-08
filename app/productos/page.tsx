import { ProductsContent } from '@/containers/products/ProductsContent'
import { getProductsService } from '@/services/products'

const PAGE_SIZE = 12

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { category, brand, sort, page } = await searchParams

  const { products, pagination } = await getProductsService({
    category,
    brand,
    page,
    pageSize: PAGE_SIZE,
    sort,
  })

  return <ProductsContent products={products} pagination={pagination} />
}
