# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server

## Project Architecture

This is a Next.js 16 (App Router) website for Northern Disconnection, a psychedelic americana band from Sonoma County, CA. The design language is "vintage handbill meets redwood forest": deep pine greens, parchment cream, warm tan and marigold, film-grain overlay, and hard-offset "poster" shadows.

### Key Technologies
- **Framework**: Next.js 16 with App Router (React 19, Turbopack)
- **Styling**: Tailwind CSS v4 plus custom utilities in `app/global.css`
- **Animations**: Framer Motion
- **Typography**: Fraunces (display, via `--font-display` / `.font-display`) and Alegreya Sans (body, via `--font-body`), both loaded with `next/font/google` in `app/layout.tsx`
- **Analytics**: Vercel Analytics & Speed Insights

### Theme System
The palette lives in `app/global.css` `:root` variables (`--pine`, `--cream`, `--rust`, `--gold`, etc.) with matching utility classes (`.text-cream`, `.bg-pine`, `.border-rust`, ...). Reusable design pieces also defined there:
- `.retro-button` / `.retro-button--ghost` — poster-style buttons with hard offset shadows
- `.eyebrow` — small-caps section label
- `.ornament` — fleuron divider (`<div class="ornament">❦</div>`)
- `.vintage-shadow` — letterpress heading shadow
- `.logo-cream` — CSS-filter recolor that renders the black-ink logo artwork in cream (used in nav, footer, and home hero)

### Layout Structure
- `app/layout.tsx` — fonts, metadata, grain overlay, `Navbar`, page content, `Footer`
- `app/components/nav.tsx` — fixed nav, hides on scroll down
- `app/components/footer.tsx` — global footer with booking email and socials

## Content

The only dynamic content file is `content/shows.json`, loaded at build time by `lib/content.ts` (`getShowsContent()`). Edit the JSON (locally or via GitHub's web UI) and Vercel will redeploy automatically. Show dates are strings like `"June 26th, 2026"`; `lib/dates.ts` parses them, sorts shows chronologically, and finds the next upcoming show — used by both the home hero "Next Show" banner and the shows page "Next Show" badge.

Other page content is written inline in its respective component:
- `app/page.tsx` (server: loads next show) → `app/components/home-client.tsx` — full-bleed live-photo hero (`public/band-photos/gfest-live.jpg`), next-show banner, latest YouTube video, subscribe form
- `app/about/page.tsx` — about + booking call-out
- `app/music/page.tsx` — the Archive.org "Live at G-Fest 2025" embed

The newsletter subscribe form is a shared component at `app/components/subscribe-form.tsx`, used by the home and shows pages. It POSTs to `/api/subscribe`, which stores contacts in a Resend Audience (`RESEND_API_KEY` / `RESEND_AUDIENCE_ID` env vars). When `content/shows.json` gains new upcoming shows, the GitHub Action `.github/workflows/announce-shows.yml` automatically emails subscribers one digest via Resend Broadcasts (see `NEWSLETTER.md`). Show alerts require no manual steps — just edit shows.json and push.

`/api/youtube/latest` resolves the channel's most recent upload automatically: the RSS feed first (newest entry by published date), then a scrape of the channel's Videos tab (the feed has had day-long outages), then the hardcoded `FALLBACK_VIDEO_ID` in `app/api/youtube/latest/route.ts` as a last resort. New uploads appear on the homepage without any code changes.

### Architecture Notes
- Server components load content at build time; client components handle interactivity
- "Next show" is computed server-side and passed as props to avoid hydration mismatches
- Horizontal overflow is clipped globally (`overflow-x: clip`) so decorative elements (aurora glow, rotated photo frames) can bleed off-canvas safely
