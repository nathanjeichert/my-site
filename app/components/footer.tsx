'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Mail } from 'lucide-react'

const BOOKING_EMAIL = 'nathanjeichert@gmail.com'

export default function Footer() {
  return (
    <footer className="border-t-2 border-rust/40 bg-pine/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Mark + blurb */}
          <div className="flex items-start gap-4">
            <Image
              src="/logonotext.svg"
              alt=""
              aria-hidden="true"
              width={40}
              height={119}
              className="logo-cream h-24 w-auto opacity-80"
            />
            <div>
              <h3 className="font-wordmark mb-2 text-xl text-cream">Northern Disconnection</h3>
              <p className="text-sm leading-relaxed text-sand/80">
                Psychedelic americana from Sonoma County, CA — originals and the
                songbook of the Grateful Dead, live around the Bay Area.
              </p>
            </div>
          </div>

          {/* Pages */}
          <div className="md:justify-self-center">
            <p className="eyebrow mb-4">Find Your Way</p>
            <div className="space-y-2">
              <Link href="/about" className="block text-sand transition-colors hover:text-gold">About</Link>
              <Link href="/shows" className="block text-sand transition-colors hover:text-gold">Shows</Link>
              <Link href="/music" className="block text-sand transition-colors hover:text-gold">Music</Link>
            </div>
          </div>

          {/* Booking + socials */}
          <div className="md:justify-self-end">
            <p className="eyebrow mb-4">Booking &amp; Inquiries</p>
            <a
              href={`mailto:${BOOKING_EMAIL}`}
              className="text-rust underline decoration-rust/40 underline-offset-4 transition-colors hover:text-gold"
            >
              {BOOKING_EMAIL}
            </a>
            <div className="mt-5 flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href="https://www.instagram.com/northerndisconnection"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-rust/40 bg-rust/10 p-3 text-cream transition-colors hover:bg-rust/30"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                href="https://www.youtube.com/channel/UCOpZMRlcndhoCcN1knIHIHA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-full border border-rust/40 bg-rust/10 p-3 text-cream transition-colors hover:bg-rust/30"
              >
                <Youtube size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href={`mailto:${BOOKING_EMAIL}`}
                aria-label="Email"
                className="rounded-full border border-rust/40 bg-rust/10 p-3 text-cream transition-colors hover:bg-rust/30"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-rust/30 pt-8 text-center">
          <p className="text-sm text-sand/70">
            © {new Date().getFullYear()} Northern Disconnection. All rights reserved.
          </p>
          <p className="mt-2 text-xs italic text-sand/50">
            Crafted with love in Sonoma County, CA
          </p>
        </div>
      </div>
    </footer>
  )
}
