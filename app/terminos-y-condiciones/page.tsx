import { notFound } from 'next/navigation'

import TyCContent from '@/containers/tyc/TyCContent'
import { getTyCService } from '@/services/tyc'

export default async function TyCPage() {
  const tyc = await getTyCService()
  if (!tyc) {
    notFound()
  }

  return <TyCContent tyc={tyc} />
}
