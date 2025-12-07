import { strapiQuery } from './strapi'
import type { Brand } from '@/interfaces/brands'

export const getBrandsService = (): Promise<Brand[]> => {
  return strapiQuery('brands?fields[0]=name&sort=name:asc').then((res) => {
    return res.data
  })
}
