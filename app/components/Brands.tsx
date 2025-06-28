/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Container from './ui/Container'

const Brands = () => {
  return (
    <section className="bg-[#F9F3F0] mt-16 py-15">
      <Container className="flex flex-wrap py-20">
        <div className="w-full max-w-full flex-shrink-0 lg:mt-2 lg:w-1/3 lg:flex-none">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500 xl:text-base">
            Our Clients
          </h2>
          <h3 className="mb-3 font-bold text-gray-800 sm:text-2xl xl:text-4xl">
            Trusted by over 300+ clients
          </h3>
          <p className="">
            We bring solutions to make life easier for our customers.
          </p>
        </div>
        <div className="w-full max-w-full py-10 lg:w-2/3 lg:flex-none lg:px-8 lg:py-0">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="w-32">
              <img
                src="https://componentland.com/images/znFUHjtfFGgWw3iwf6L7U.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32">
              <img
                src="https://componentland.com/images/1jqHy4mfbbJdowYMMYmv4.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32">
              <img
                src="https://componentland.com/images/fYCAxh-v8cM9_Kz5F_NWc.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32">
              <img
                src="https://componentland.com/images/qr76A1CV-Bngcu7a43OtD.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32">
              <img
                src="https://componentland.com/images/tNngfZmftaEAbhB6-nkdB.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32">
              <img
                src="https://componentland.com/images/_zdDNHsf3wwrPIPNx_5YL.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32">
              <img
                src="https://componentland.com/images/0theMmZM4a-L5PWRswKPD.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32">
              <img
                src="https://componentland.com/images/famjKUew9dTPjjl1stpS7.png"
                alt=""
                className=""
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Brands
