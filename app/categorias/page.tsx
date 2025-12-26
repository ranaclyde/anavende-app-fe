import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import CategoriesContent from '@/containers/categories/CategoriesContent'
import { getCategoriesService } from '@/services/categories'
import { Loader } from '@/components/layout/Loader'

export default async function CategoriesPage() {
  const categories = await getCategoriesService()

  if (!categories) {
    notFound()
  }

  return (
    <Suspense fallback={<Loader message="Cargando categorías..." />}>
      <CategoriesContent categories={categories} />
    </Suspense>
  )
}
