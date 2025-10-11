import type { NextConfig } from 'next'

const { STRAPI_API_URL } = process.env

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${STRAPI_API_URL}/uploads/**`)],
  },
}

export default nextConfig
