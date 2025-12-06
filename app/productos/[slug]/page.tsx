import { notFound } from 'next/navigation'
import { getProductBySlugService } from '@/services/products'
import ProductDetailContent from './ProductDetailContent'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlugService(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailContent product={product} />
}
