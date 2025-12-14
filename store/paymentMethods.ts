import { create } from 'zustand'

import type { CustomPage } from './../interfaces/customPage'
import { getPaymentMethodsService } from '@/services/paymentMethods'

type State = {
  paymentMethods: CustomPage
}

type Actions = {
  getPaymentMethods: () => Promise<void>
}

const initState: State = {
  paymentMethods: {} as CustomPage,
}

const usePaymentMethodStore = create<State & Actions>((set) => ({
  ...initState,
  getPaymentMethods: async () => {
    try {
      const response = await getPaymentMethodsService()
      set({ paymentMethods: response })
    } catch (error) {
      console.log('Error fetching paymentMethods:', error)
      set({ paymentMethods: {} as CustomPage })
    }
  },
}))

export default usePaymentMethodStore
