# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server

## Project Architecture

This is a Next.js 14 (App Router) website for Northern Disconnection, a psychedelic americana duo from Sonoma County, CA. The site features a custom audio player, show listings, and forest-inspired design aesthetic.

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with custom psychedelic theme
- **Animations**: Framer Motion for page transitions and interactive elements
- **Typography**: Geist font family
- **Analytics**: Vercel Analytics & Speed Insights

### Custom Theme System
The site uses a custom color palette defined in `app/global.css:8-25`:
- `--midnight` (#0b3d2e) - Primary background
- `--cream` (#faf8f3) - Light text
- `--rust` (#D7B48A) - Accent color
- `--sage` (#7d8471) - Secondary accent
- `--gold` (#f4c430) - Highlight color
- `--burgundy` (#800020) - Dark accent
- `--sand` (#e8dcc6) - Muted text

### Layout Structure
- Global layout in `app/layout.tsx` includes navigation, footer, analytics, and grain overlay effect
- Navigation component handles routing between pages
- Footer component provides social links and copyright
- All pages use consistent padding and responsive design patterns

## Content

The only dynamic content file is `content/shows.json`, loaded at build time
by `lib/content.ts` (`getShowsContent()`) and rendered by
`app/shows/shows-client.tsx`. Edit the JSON (locally or via GitHub's web
UI) and Vercel will redeploy automatically.

Other page content is written inline in its respective page component:
- `app/page.tsx` — home / hero
- `app/about/page.tsx` — about
- `app/music/page.tsx` — the Archive.org "Live at G-Fest 2025" embed

The newsletter subscribe form is a shared component at
`app/components/subscribe-form.tsx`, used by both the home page and the
shows page. It POSTs to `/api/subscribe`, which stores emails in Redis.

### Architecture Notes
- Server components load content at build time for optimal performance
- Client components handle interactivity while maintaining content structure
- Split component architecture (page.tsx → client.tsx) maintains SSR benefits