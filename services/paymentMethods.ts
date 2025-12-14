import { strapiQuery } from './strapi'
import type { CustomPage } from '@/interfaces/customPage'

export const getPaymentMethodsService = (): Promise<CustomPage> => {
  return strapiQuery('payment-method').then((res) => {
    return res.data
  })
}
