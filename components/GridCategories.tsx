import { type Category } from '@/interfaces/categories'
import CategoryCard from './CategoryCard'

interface GridCategoriasProps {
  categories: Category[]
}

export default function GridCategorias({ categories }: GridCategoriasProps) {
  if (!categories || categories.length === 0) return null

  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.slug}
          name={cat.name}
          image={cat.image}
          slug={cat.slug}
        />
      ))}
    </div>
  )
}
