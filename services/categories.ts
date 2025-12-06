import { type Category } from '@/interfaces/categories'
import { getImageUrl, strapiQuery } from './strapi'

export async function getCategoriesService(): Promise<Category[]> {
  const res = await strapiQuery(
    'categories?fields[0]=name&fields[1]=slug&populate[image][fields][0]=url'
  )
  return res.data.map((category: any) => {
    const { name, slug, image: rawImage } = category
    const image = getImageUrl(rawImage.url)
    return { name, slug, image }
  })
}

// Devuelve solo 6 de las categorías destacadas
export function getHighlightedCategoriesService(): Promise<Category[]> {
  return strapiQuery(
    'categories?fields[0]=name&fields[1]=slug&populate[image][fields][0]=url&filters[isHighlighted]=true&pagination[limit]=6'
  ).then((res) => {
    return res.data.map((category: any) => {
      const { name, slug, image: rawImage } = category
      const image = getImageUrl(rawImage.url)
      return { name, slug, image }
    })
  })
}
