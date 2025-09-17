import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UCOpZMRlcndhoCcN1knIHIHA'
const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export async function GET() {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: 1800 },
      headers: {
        'User-Agent': 'NorthernDisconnectionSite/1.0',
        Accept: 'application/atom+xml,application/xml',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch YouTube feed.' }, { status: response.status })
    }

    const xml = await response.text()
    const entryMatch = xml.match(/<entry>[\s\S]*?<\/entry>/)

    if (!entryMatch) {
      return NextResponse.json({ error: 'No recent videos found.' }, { status: 404 })
    }

    const entry = entryMatch[0]
    const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)
    const titleMatch = entry.match(/<title>(.*?)<\/title>/)
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/)
    const thumbnailMatch = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/)

    if (!videoIdMatch || !titleMatch) {
      return NextResponse.json({ error: 'Malformed YouTube response.' }, { status: 502 })
    }

    const videoId = videoIdMatch[1]

    const payload = {
      videoId,
      title: decodeHtmlEntities(titleMatch[1]),
      publishedAt: publishedMatch ? publishedMatch[1] : null,
      thumbnail: thumbnailMatch ? thumbnailMatch[1] : null,
      url: 'https://www.youtube.com/watch?v=' + videoId,
    }

    return new NextResponse(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=1800, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error('Error loading YouTube feed', error)
    return NextResponse.json({ error: 'Unexpected error retrieving latest video.' }, { status: 500 })
  }
}
