import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Northern Disconnection',
    template: '%s | Northern Disconnection',
  },
  description: 'Northern Disconnection - A young americana duo from Sonoma County, CA',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/northern-disconnection-logo.svg',
  },
  openGraph: {
    title: 'Northern Disconnection',
    description: 'Northern Disconnection - A young americana duo from Sonoma County, CA',
    url: baseUrl,
    siteName: 'Northern Disconnection',
    locale: 'en_US',
    type: 'website',
    images: ['/northern-disconnection-logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-rust bg-midnight',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased min-h-screen">
        <div className="grain-overlay"></div>
        <main className="relative z-10">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
