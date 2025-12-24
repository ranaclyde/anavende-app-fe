import { strapiQuery } from './strapi'
import type { Setting } from '@/interfaces/settings'

export const getSettingsService = (): Promise<Setting> => {
  return strapiQuery('setting?populate[shippingRates][fields]').then((res) => {
    return res.data
  })
}
