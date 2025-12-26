import { create } from 'zustand'

import { type Category } from '@/interfaces/categories'
import { getCategoriesService } from '@/services/categories'

type State = {
  categories: Category[]
}

type Actions = {
  getCategories: () => Promise<void>
}

const initState: State = {
  categories: [],
}

const useCategoryStore = create<State & Actions>((set) => ({
  ...initState,
  getCategories: async () => {
    try {
      const response = await getCategoriesService()
      set({ categories: response })
    } catch (error) {
      console.log('Error fetching categories:', error)
      set({ categories: [] })
    }
  },
}))

export default useCategoryStore
