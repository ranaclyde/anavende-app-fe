import Image from 'next/image'
import Link from 'next/link'

const categorias = [
  {
    id: 1,
    nombre: 'Mouses',
    img: '/images/categories/mouses.jpg',
    titulo: 'Mouses',
    descripcion: 'Precisión y ergonomía para cada tipo de usuario.',
  },
  {
    id: 2,
    nombre: 'Teclados',
    img: '/images/categories/mouses.jpg',
    titulo: 'Teclados',
    descripcion: 'Mecánicos, retroiluminados y de alto rendimiento.',
  },
  {
    id: 3,
    nombre: 'Auriculares',
    img: '/images/categories/headset.jpg',
    titulo: 'Auriculares',
    descripcion: 'Sonido envolvente para gamers y amantes de la música.',
  },
  {
    id: 4,
    nombre: 'Cables',
    img: '/images/categories/mouses.jpg',
    titulo: 'Cables',
    descripcion: 'Conexión confiable y durabilidad garantizada.',
  },
  {
    id: 5,
    nombre: 'Todas las categorias',
    img: '/images/categories/mouses.jpg',
    titulo: 'Todas las categorías',
    descripcion: 'Descubrí todos nuestros productos en un solo lugar.',
  },
  {
    id: 6,
    nombre: 'Cargadores',
    img: '/images/categories/mouses.jpg',
    titulo: 'Cargadores',
    descripcion: 'Potencia segura para todos tus dispositivos.',
  },
  {
    id: 7,
    nombre: 'Joysticks',
    img: '/images/categories/mouses.jpg',
    titulo: 'Joysticks',
    descripcion: 'Control preciso para jugadores competitivos.',
  },
  {
    id: 8,
    nombre: 'Parlantes',
    img: '/images/categories/mouses.jpg',
    titulo: 'Parlantes',
    descripcion: 'Sonido potente para cualquier ambiente.',
  },
]

const positions = [
  '', // 1
  '', // 2
  'col-span-2', // 3
  'row-span-2 row-start-2', // 4
  'col-span-2 row-start-2', // 5
  'col-start-4 row-start-2', // 6
  'col-span-2 col-start-2 row-start-3', // 7
  'col-start-4 row-start-3', // 8
]

export default function GridCategorias() {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4">
      {categorias.map((cat, i) => (
        <Link
          href={`/categories/${cat.nombre.toLowerCase()}`}
          key={cat.id}
          className={`relative overflow-hidden rounded-md group ${positions[i]} min-h-60`}
        >
          {/* Imagen de fondo */}
          <Image
            src={cat.img}
            alt={cat.nombre}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Capa oscura permanente */}
          <div className="absolute inset-0 bg-black/40 z-0" />

          {/* Contenido siempre visible */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
            <div>
              <h3 className="text-white text-lg font-semibold">{cat.titulo}</h3>
              <p className="text-white text-sm mt-1">{cat.descripcion}</p>
            </div>

            {/* Botón solo visible en hover */}
            <span className="text-white text-sm underline self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ver categoría →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
