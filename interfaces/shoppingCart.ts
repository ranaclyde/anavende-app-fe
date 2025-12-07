import type { Color } from './colors'

export interface ShoppingCart {
  items: ShoppingCartItem[]
  totalPrice: number
}

export interface ShoppingCartItem {
  productId: number
  quantity: number
  price: number
  imagenUrl: string
  name: string
  color: Color
  maxStock: number
}
