import CategoryCard from './CategoryCard'

const categorias = [
  {
    id: 1,
    name: 'Mouses',
    image: '/images/categories/mouses.jpg',
  },
  {
    id: 2,
    name: 'Teclados',
    image: '/images/categories/mouses.jpg',
  },
  {
    id: 3,
    name: 'Auriculares',
    image: '/images/categories/headphones.jpg',
  },
  {
    id: 4,
    name: 'Cables',
    image: '/images/categories/mouses.jpg',
  },
  {
    id: 6,
    name: 'Cargadores',
    image: '/images/categories/mouses.jpg',
  },
  {
    id: 7,
    name: 'Joysticks',
    image: '/images/categories/mouses.jpg',
  },
]

export default function GridCategorias() {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categorias.map((cat) => (
        <CategoryCard
          key={cat.id}
          name={cat.name}
          image={cat.image}
          href="javascript:void(0)"
        />
      ))}
    </div>
  )
}
