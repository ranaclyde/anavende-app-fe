import React from 'react'
import Image from 'next/image'

import Container from './ui/Container'

const brands = [
  {
    name: 'Suono',
    image: '/images/brands/suono.jpg',
    alt: 'Suono logo',
  },
  {
    name: 'GENIUS',
    image: '/images/brands/GENIUS.png',
    alt: 'GENIUS logo',
  },
  {
    name: 'KINGSTON',
    image: '/images/brands/KINGSTON.png',
    alt: 'KINGSTON logo',
  },
  {
    name: 'Marvo',
    image: '/images/brands/marvo.png',
    alt: 'Marvo logo',
  },
  {
    name: 'NETMAK',
    image: '/images/brands/NETMAK.png',
    alt: 'NETMAK logo',
  },
  {
    name: 'Redragon',
    image: '/images/brands/redragon.png',
    alt: 'Redragon logo',
  },
  {
    name: 'SANDISK',
    image: '/images/brands/SANDISK.png',
    alt: 'SANDISK logo',
  },
  {
    name: 'X-Trike Me',
    image: '/images/brands/x-trike-me.jpg',
    alt: 'X-Trike Me logo',
  },
]

const Brands = () => {
  return (
    <section className="bg-[#F9F3F0] mt-16 py-15">
      <Container className="flex flex-wrap py-20">
        <div className="w-full max-w-full flex-shrink-0 lg:mt-2 lg:w-1/3 lg:flex-none">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500 xl:text-base">
            Nuestras marcas
          </h2>
          <h3 className="mb-3 font-bold text-gray-800 sm:text-2xl xl:text-4xl">
            Algunas marcas con las que trabajamos
          </h3>
          <p>
            Conoce algunas de las marcas con las que trabajamos para ofrecerte
            la mejor relacion precio/calidad.
          </p>
        </div>
        <div className="w-full max-w-full py-10 lg:w-2/3 lg:flex-none lg:px-8 lg:py-0">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="w-32 h-[85px] flex items-center justify-center justify-self-center"
              >
                <Image
                  src={brand.image}
                  alt={brand.alt}
                  width={128}
                  height={85}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Brands
