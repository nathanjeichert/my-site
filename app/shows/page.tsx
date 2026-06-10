import { getShowsContent } from '@/lib/content'
import { sortShowsByDate, findNextShowIndex } from '@/lib/dates'
import ShowsClient from './shows-client'

export const metadata = {
  title: 'Shows',
  description: 'Upcoming concerts and events for Northern Disconnection.',
}

export default function ShowsPage() {
  const content = getShowsContent()
  const sortedShows = sortShowsByDate(content.upcomingShows)
  const nextShowIndex = findNextShowIndex(sortedShows)

  return (
    <ShowsClient
      title={content.pageContent.title}
      shows={sortedShows}
      nextShowIndex={nextShowIndex}
    />
  )
}
