import { create } from 'zustand'

export interface ShippingInfo {
  address: string
  distance: number
  cost: number
  zone: string
}

type ShippingMethod = 'pickup' | 'delivery'

type State = {
  shippingMethod: ShippingMethod
  currentShipping: ShippingInfo | null
}

type Actions = {
  setShippingMethod: (method: ShippingMethod) => void
  setCurrentShipping: (shipping: ShippingInfo | null) => void
  reset: () => void
}

const initState: State = {
  shippingMethod: 'pickup',
  currentShipping: null,
}

const useShippingStore = create<State & Actions>()((set) => ({
  ...initState,
  setShippingMethod: (method) => set({ shippingMethod: method }),
  setCurrentShipping: (shipping) => set({ currentShipping: shipping }),
  reset: () => set(initState),
}))

export default useShippingStore
