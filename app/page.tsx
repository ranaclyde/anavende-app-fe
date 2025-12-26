// Components
import HomeContent from '@/containers/home/HomeContent'

// Services
import { getFeaturedCategoriesService } from '@/services/categories'
import { getFeaturedProductsService } from '@/services/products'

export default async function HomePage() {
  const [featuredCategories, featuredProducts] = await Promise.all([
    getFeaturedCategoriesService(),
    getFeaturedProductsService(),
  ])

  return (
    <HomeContent
      featuredCategories={featuredCategories}
      featuredProducts={featuredProducts}
    />
  )
}
