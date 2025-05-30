import { baseUrl } from 'app/sitemap'

export async function GET() {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Two Against Nature</title>
        <link>${baseUrl}</link>
        <description>Two Against Nature - A young americana duo from Sonoma County, CA. Stay updated with our latest shows, music releases, and news.</description>
        <item>
          <title>Welcome to Two Against Nature</title>
          <link>${baseUrl}</link>
          <description>Official website launch for Two Against Nature, featuring our music, upcoming shows, and band information.</description>
          <pubDate>${new Date().toUTCString()}</pubDate>
        </item>
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
