import { strapiQuery } from './strapi'
import type { CustomPage } from '@/interfaces/customPage'

export const getAboutUsService = (): Promise<CustomPage> => {
  return strapiQuery('about-us').then((res) => {
    return res.data
  })
}
