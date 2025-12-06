import { BlocksContent } from '@strapi/blocks-react-renderer'
import { Brand } from './brands'
import { Category } from './categories'
import { Color } from './colors'

export interface SimpleProduct {
  id: number
  documentId: string
  name: string
  slug: string
  price: number
  discount?: number
  brand: Brand
  categories: Category[]
  stock: ProductStock[]
  isNew: boolean
  isHighlighted: boolean
  isActive: boolean
  description: BlocksContent
}

export interface ProductStock {
  id: number
  quantity: number
  colors: Color[]
  images: Image[]
}

interface Image {
  id: number
  documentId: string
  url: string
}
