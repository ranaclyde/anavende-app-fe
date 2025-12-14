import { BlocksContent } from '@strapi/blocks-react-renderer'

export interface FAQ {
  id: number
  slug: string
  question: string
  answer: BlocksContent
  order: number
}
