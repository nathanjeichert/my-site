# Northern Disconnection - Official Website

This is the official website for Northern Disconnection, a young americana duo from Sonoma County, CA. The site includes:

- Band information and story
- Upcoming shows calendar
- Music player with original tracks
- Modern, responsive design
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Dynamic OG images
- Syntax highlighting
- Tailwind v4
- Vercel Speed Insights / Web Analytics
- Geist font

## Features

### About Page
Learn about the band's story, musical style, and Sonoma County roots.

### Shows Calendar
View upcoming concerts and events with venue details, dates, and ticket information.

### Music Player
Listen to original tracks with a custom-built audio player featuring:
- Play/pause controls
- Progress tracking
- Time display
- Track information

## Demo

Visit the live site: [Northern Disconnection](https://your-vercel-url.vercel.app)

## Development

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

Clone the repository:
```bash
git clone https://github.com/nathanjeichert/my-site.git
cd my-site
```

Install dependencies:
```bash
npm install
# or
pnpm install
```

Run the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Adding Music

To add new tracks:
1. Place MP3 files in the `public/music/` directory
2. Update the `tracks` array in `app/music/page.tsx`
3. Include track metadata (title, duration, description)

### Updating Shows

To add or modify upcoming shows:
1. Edit the `upcomingShows` array in `app/shows/page.tsx`
2. Include venue, date, time, location, and description

## Deployment

Deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nathanjeichert/my-site)

Or deploy manually:
```bash
npm run build
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Typography**: Geist font family
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## License

© 2024 Northern Disconnection. All rights reserved.
