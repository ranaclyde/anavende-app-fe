export async function strapiQuery(url: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  })
  return await res.json()
}
