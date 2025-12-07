import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { ShoppingCart, ShoppingCartItem } from '@/interfaces/shoppingCart'

type State = {
  shoppingCart: ShoppingCart
}

type Actions = {
  setItem: (data: ShoppingCartItem) => Promise<void>
  incrementQuantity: (productId: number) => Promise<void>
  decrementQuantity: (productId: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
}

const initState: State = {
  shoppingCart: {
    items: [],
    totalPrice: 0,
  },
}

const useShoppingCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initState,
      setItem: async (data: ShoppingCartItem) => {
        const currentItems = get().shoppingCart.items
        const alreadyExists = currentItems.find(
          (item) => item.productId === data.productId
        )

        // Si el ítem no existe, lo agregamos directamente
        if (!alreadyExists) {
          set((state) => ({
            shoppingCart: {
              ...state.shoppingCart,
              items: [...state.shoppingCart.items, data],
              totalPrice:
                state.shoppingCart.totalPrice + data.price * data.quantity,
            },
          }))
          return
        }

        // Si el ítem ya existe, actualizamos la cantidad respetando el stock máximo
        const updatedItems = currentItems.map((item) =>
          item.productId === data.productId
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + data.quantity,
                  data.maxStock
                ),
                price: data.price,
                maxStock: data.maxStock,
              }
            : item
        )
        // Recalculamos el precio total
        const newTotalPrice = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )

        set((state) => ({
          shoppingCart: {
            ...state.shoppingCart,
            items: updatedItems,
            totalPrice: newTotalPrice,
          },
        }))
      },
      incrementQuantity: async (productId: number) => {
        const currentItems = get().shoppingCart.items
        const itemToUpdate = currentItems.find(
          (item) => item.productId === productId
        )

        if (!itemToUpdate) return

        // No incrementar si ya alcanzó el stock máximo
        if (itemToUpdate.quantity >= itemToUpdate.maxStock) return

        const updatedItems = currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )

        const newTotalPrice = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )

        set((state) => {
          return {
            shoppingCart: {
              ...state.shoppingCart,
              items: updatedItems,
              totalPrice: newTotalPrice,
            },
          }
        })
      },
      decrementQuantity: async (productId: number) => {
        const currentItems = get().shoppingCart.items
        const itemToUpdate = currentItems.find(
          (item) => item.productId === productId
        )

        if (!itemToUpdate || itemToUpdate.quantity <= 1) return

        const updatedItems = currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )

        const newTotalPrice = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )

        set((state) => ({
          shoppingCart: {
            ...state.shoppingCart,
            items: updatedItems,
            totalPrice: newTotalPrice,
          },
        }))
      },
      removeItem: async (productId: number) => {
        set((state) => ({
          shoppingCart: {
            ...state.shoppingCart,
            items: state.shoppingCart.items.filter(
              (item) => item.productId !== productId
            ),
            totalPrice: state.shoppingCart.items
              .filter((item) => item.productId !== productId)
              .reduce((total, item) => total + item.price * item.quantity, 0),
          },
        }))
      },
    }),
    {
      name: 'anavende-shopping-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useShoppingCartStore
