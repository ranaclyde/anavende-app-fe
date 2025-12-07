import { create } from 'zustand'

import { getBrandsService } from '@/services/brands'
import type { Brand } from '@/interfaces/brands'

type State = {
  brands: Brand[]
}

type Actions = {
  getBrands: () => Promise<void>
}

const initState: State = {
  brands: [],
}

const useBrandStore = create<State & Actions>((set) => ({
  ...initState,
  getBrands: async () => {
    try {
      const response = await getBrandsService()
      set({ brands: response })
    } catch (error) {
      console.log('Error fetching brands:', error)
      set({ brands: [] })
    }
  },
}))

export default useBrandStore
