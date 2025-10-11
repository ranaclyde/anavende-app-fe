import { type Category } from '../interfaces/categories'
import { strapiQuery } from './strapi'

const { STRAPI_API_URL } = process.env

export function getCategories(): Promise<Category[]> {
  return strapiQuery(
    'categories?fields[0]=name&fields[1]=slug&populate[image][fields][0]=url'
  ).then((res) => {
    return res.data.map((category: any) => {
      const { name, slug, image: rawImage } = category
      const image = `${STRAPI_API_URL}${rawImage.url}`
      return { name, slug, image }
    })
  })
}

// Devuelve solo 6 de las categorías destacadas
export function getHighlightedCategories(): Promise<Category[]> {
  return strapiQuery(
    'categories?fields[0]=name&fields[1]=slug&populate[image][fields][0]=url&filters[isHighlighted]=true&pagination[limit]=6'
  ).then((res) => {
    return res.data.map((category: any) => {
      const { name, slug, image: rawImage } = category
      const image = `${STRAPI_API_URL}${rawImage.url}`
      return { name, slug, image }
    })
  })
}
