export async function strapiQuery(url: string) {
  const res = await fetch(`${process.env.STRAPI_API_URL}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
    next: {
      revalidate: 60, // Revalidar cada 60 segundos
    },
  })
  return await res.json()
}

export function getImageUrl(path: string) {
  return `${process.env.STRAPI_API_URL}${path}`
}
