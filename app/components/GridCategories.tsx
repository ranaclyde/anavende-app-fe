import Image from 'next/image'
import Link from 'next/link'

const categorias = [
  {
    id: 1,
    nombre: 'Mouses',
    img: '/images/categories/mouses.jpg',
  },
  {
    id: 2,
    nombre: 'Teclados',
    img: '/images/categories/mouses.jpg',
  },
  {
    id: 3,
    nombre: 'Auriculares',
    img: '/images/categories/headphones.jpg',
  },
  {
    id: 4,
    nombre: 'Cables',
    img: '/images/categories/mouses.jpg',
  },
  {
    id: 6,
    nombre: 'Cargadores',
    img: '/images/categories/mouses.jpg',
  },
  {
    id: 7,
    nombre: 'Joysticks',
    img: '/images/categories/mouses.jpg',
  },
]

export default function GridCategorias() {
  return (
    <div className="flex flex-wrap justify-center lg:justify-between gap-2 w-full mt-8">
      {categorias.map((cat) => (
        <Link
          key={cat.id}
          href="javascript:void(0)"
          className="group relative block overflow-hidden transition ease-out active:opacity-75 w-full md:w-47 h-47"
        >
          {/* Imagen de fondo */}
          <Image
            src={cat.img}
            alt={cat.nombre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/25 transition ease-out group-hover:bg-black/0" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="rounded-3xl bg-white/85 px-4 py-3 text-sm font-semibold tracking-wide uppercase transition ease-out group-hover:bg-indigo-600 group-hover:text-white dark:border-gray-800 dark:bg-gray-900/90">
              {cat.nombre}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
