import { getShowsContent } from '@/lib/content'
import ShowsClient from './shows-client'

export const metadata = {
  title: 'Shows',
  description: 'Upcoming concerts and events for Two Against Nature.',
}

export default function ShowsPage() {
  const content = getShowsContent()
  
  return <ShowsClient content={content} />
}