const { STRAPI_API_URL, STRAPI_TOKEN } = process.env

export function strapiQuery(url: string) {
  return fetch(`${STRAPI_API_URL}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  }).then((res) => res.json())
}
