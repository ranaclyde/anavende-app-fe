import { notFound } from 'next/navigation'

import AboutUsContent from '@/containers/about-us/AboutUsContent'
import { getAboutUsService } from '@/services/aboutUs'

export default async function AboutUsPage() {
  const aboutUs = await getAboutUsService()
  if (!aboutUs) {
    notFound()
  }

  return <AboutUsContent aboutUs={aboutUs} />
}
