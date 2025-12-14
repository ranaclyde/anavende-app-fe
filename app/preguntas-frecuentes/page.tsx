import { notFound } from 'next/navigation'

import FaqsContent from '@/containers/faqs/FaqsContent'
import { getFaqsService } from '@/services/faqs'

export default async function FaqsPage() {
  const faqs = await getFaqsService()

  if (!faqs) {
    notFound()
  }

  return <FaqsContent faqs={faqs} />
}
