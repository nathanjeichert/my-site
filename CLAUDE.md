# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server

## Project Architecture

This is a Next.js 14 (App Router) website for Two Against Nature, a psychedelic americana duo from Sonoma County, CA. The site features a custom audio player, show listings, and psychedelic design aesthetic.

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with custom psychedelic theme
- **Animations**: Framer Motion for page transitions and interactive elements
- **Typography**: Geist font family
- **Analytics**: Vercel Analytics & Speed Insights

### Custom Theme System
The site uses a custom color palette defined in `app/global.css:8-25`:
- `--midnight` (#0a0a0a) - Primary background
- `--cream` (#faf8f3) - Primary text
- `--rust` (#d4622a) - Accent color
- `--sage` (#7d8471) - Secondary accent
- `--gold` (#f4c430) - Highlight color
- `--burgundy` (#800020) - Dark accent
- `--sand` (#e8dcc6) - Muted text

### Content Management
- **Music**: Add MP3 files to `public/music/` and update the `tracks` array in `app/music/page.tsx:13-38`
- **Shows**: Update the `upcomingShows` array in `app/shows/page.tsx:11-39`
- All content is statically defined in the respective page components

### Animation System
The site heavily uses Framer Motion for:
- Page entrance animations
- Interactive hover effects
- Custom audio player animations (spinning record effect)
- Sequential item reveals with staggered delays

### Layout Structure
- Global layout in `app/layout.tsx` includes navigation, footer, analytics, and grain overlay effect
- Navigation component handles routing between pages
- Footer component provides social links and copyright
- All pages use consistent padding and responsive design patterns

### Audio Player
The music page features a custom-built audio player with:
- Visual record spinning animation synced to play state
- Track switching functionality
- Progress bar simulation (visual only, not connected to actual audio)
- Track listing with click-to-select functionality