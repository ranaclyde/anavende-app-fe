import { strapiQuery } from './strapi'
import { FAQ } from '@/interfaces/faqs'

export const getFaqsService = (): Promise<FAQ[]> => {
  return strapiQuery(
    'faqs?fields[0]=question&fields[1]=answer&fields[2]=slug&fields[3]=order&filters[isActive]=true&sort[0]=order:asc'
  ).then((res) => {
    return res.data
  })
}
