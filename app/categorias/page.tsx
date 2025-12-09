import { notFound } from 'next/navigation'

import CategoriesContent from '@/containers/categories/CategoriesContent'
import { getCategoriesService } from '@/services/categories'

export default async function CategoriesPage() {
  const categories = await getCategoriesService()

  if (!categories) {
    notFound()
  }

  return <CategoriesContent categories={categories} />
}
