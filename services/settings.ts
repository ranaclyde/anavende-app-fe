import { strapiQuery } from './strapi'
import type { Setting } from '@/interfaces/settings'

export const getSettingsService = (): Promise<Setting> => {
  return strapiQuery('setting').then((res) => {
    return res.data
  })
}
