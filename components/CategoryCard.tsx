import React from 'react'
import Image from 'next/image'

interface CategoryCardProps {
  name: string
  image: string
  href: string
}

const CategoryCard = ({ name, image, href }: CategoryCardProps) => {
  return (
    <a
      href={href}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-square relative">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 text-center group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
      </div>
    </a>
  )
}

export default CategoryCard
