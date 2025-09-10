import { getShowsContent } from '@/lib/content'
import ShowsClient from './shows-client'

export const metadata = {
  title: 'Shows',
  description: 'Upcoming concerts and events for Northern Disconnection.',
}

export default function ShowsPage() {
  const content = getShowsContent()
  
  return <ShowsClient content={content} />
}