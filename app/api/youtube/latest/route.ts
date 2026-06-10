import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UCOpZMRlcndhoCcN1knIHIHA'
const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID

// YouTube's RSS feed intermittently 404s for this channel. Keep the newest
// upload here so the homepage always has a video to show.
const FALLBACK_VIDEO_ID = 'nekXO8t1tcE'
const FALLBACK_TITLE = 'Dark Hollow, Live at G-Fest 2025'

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function jsonWithCache(payload: unknown) {
  return new NextResponse(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=1800, stale-while-revalidate=3600',
    },
  })
}

async function fetchFromFeed() {
  const response = await fetch(FEED_URL, {
    next: { revalidate: 1800 },
    headers: {
      'User-Agent': 'NorthernDisconnectionSite/1.0',
      Accept: 'application/atom+xml,application/xml',
    },
  })

  if (!response.ok) return null

  const xml = await response.text()
  const entryMatch = xml.match(/<entry>[\s\S]*?<\/entry>/)
  if (!entryMatch) return null

  const entry = entryMatch[0]
  const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)
  const titleMatch = entry.match(/<title>(.*?)<\/title>/)
  const publishedMatch = entry.match(/<published>(.*?)<\/published>/)
  const thumbnailMatch = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/)

  if (!videoIdMatch || !titleMatch) return null

  const videoId = videoIdMatch[1]

  return {
    videoId,
    title: decodeHtmlEntities(titleMatch[1]),
    publishedAt: publishedMatch ? publishedMatch[1] : null,
    thumbnail: thumbnailMatch ? thumbnailMatch[1] : null,
    url: 'https://www.youtube.com/watch?v=' + videoId,
  }
}

async function fetchFallback() {
  let title = FALLBACK_TITLE
  let thumbnail: string | null = null

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${FALLBACK_VIDEO_ID}&format=json`,
      { next: { revalidate: 1800 } }
    )
    if (response.ok) {
      const data = await response.json()
      if (typeof data.title === 'string') title = data.title
      if (typeof data.thumbnail_url === 'string') thumbnail = data.thumbnail_url
    }
  } catch {
    // keep hardcoded fallback values
  }

  return {
    videoId: FALLBACK_VIDEO_ID,
    title,
    publishedAt: null,
    thumbnail,
    url: 'https://www.youtube.com/watch?v=' + FALLBACK_VIDEO_ID,
  }
}

export async function GET() {
  try {
    const fromFeed = await fetchFromFeed()
    if (fromFeed) return jsonWithCache(fromFeed)
  } catch (error) {
    console.error('Error loading YouTube feed', error)
  }

  return jsonWithCache(await fetchFallback())
}
