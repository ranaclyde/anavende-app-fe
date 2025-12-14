import { BlocksContent } from '@strapi/blocks-react-renderer'

export interface CustomPage {
  id: number
  slug: string
  title: string
  description: BlocksContent
}
