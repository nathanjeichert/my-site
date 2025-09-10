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

## Content Management System

### JSON-Based Content Structure
All site content is managed through JSON files in the `/content/` directory:
- `content/music.json` - Track listings and music page content
- `content/shows.json` - Show information and venue details
- `content/about.json` - Band member profiles, philosophy, timeline
- `content/site.json` - Navigation, footer, and general site settings

### Tina CMS Integration
- Visual editing interface available at `/admin` (requires Tina.io account)
- Form-based content editing with real-time preview
- Automatic GitHub commits and Vercel deployments
- TypeScript types ensure content structure integrity

### Content Editing Workflow
1. **Visual Editor**: Edit at `/admin` with user-friendly forms
2. **Direct Editing**: Modify JSON files in GitHub repository
3. **Auto-Deploy**: Changes trigger automatic Vercel rebuilds
4. **Version Control**: All changes tracked in Git history

### CMS Configuration
- Tina config: `tina/config.ts` - defines content schemas and editing interface
- Content types: `types/content.ts` - TypeScript interfaces for all content
- Content loader: `lib/content.ts` - server-side content loading utilities

### Environment Variables Required
```
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### Architecture Notes
- Server components load content at build time for optimal performance
- Client components handle interactivity while maintaining content structure
- Split component architecture (page.tsx → client.tsx) maintains SSR benefits