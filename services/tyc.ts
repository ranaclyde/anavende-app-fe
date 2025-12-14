import { strapiQuery } from './strapi'
import type { CustomPage } from '@/interfaces/customPage'

export const getTyCService = (): Promise<CustomPage> => {
  return strapiQuery('terms-and-condition').then((res) => {
    return res.data
  })
}
