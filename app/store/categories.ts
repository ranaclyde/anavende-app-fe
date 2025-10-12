import { create } from 'zustand'

import { type Category } from '../interfaces/categories'
import {
  getCategoriesService,
  getHighlightedCategoriesService,
} from '../services/categories'

type State = {
  categories: Category[]
  highlightedCategories: Category[]
}

type Actions = {
  getCategories: () => Promise<void>
  getHighlightedCategories: () => Promise<void>
}

const initState: State = {
  categories: [],
  highlightedCategories: [],
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
  getHighlightedCategories: async () => {
    try {
      const response = await getHighlightedCategoriesService()
      set({ highlightedCategories: response })
    } catch (error) {
      console.log('Error fetching highlighted categories:', error)
      set({ highlightedCategories: [] })
    }
  },
}))

export default useCategoryStore
