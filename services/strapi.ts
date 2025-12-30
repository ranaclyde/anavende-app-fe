const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_API_URL
const STRAPI_TOKEN =
  process.env.NEXT_PUBLIC_STRAPI_TOKEN || process.env.STRAPI_TOKEN

export async function strapiQuery(url: string) {
  const res = await fetch(`${STRAPI_API_URL}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: {
      revalidate: 60, // Revalidar cada 60 segundos
    },
  })
  return await res.json()
}

export function getImageUrl(path: string) {
  return `${STRAPI_API_URL}${path}`
}
