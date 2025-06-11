import { getAboutContent } from '@/lib/content'
import AboutClient from './about-client'

export const metadata = {
  title: 'About',
  description: 'Learn more about Two Against Nature - our story, our music, and our journey.',
}

export default function AboutPage() {
  const content = getAboutContent()
  
  return <AboutClient content={content} />
}