'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Music, Calendar, ChevronRight, Mail, Youtube, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <div className="w-full max-w-4xl mb-8">
            <Image
              src="/northern-disconnection-logo.svg"
              alt="Northern Disconnection"
              width={800}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-xl text-sand max-w-2xl mx-auto leading-relaxed font-bold">
              Northern Disconnection is a Bay Area band bringing familiar sounds in new directions and to new audiences.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/music" className="retro-button">
                Listen Now
              </Link>
              <Link href="/shows" className="retro-button bg-transparent border-rust text-rust hover:bg-rust hover:text-midnight">
                See Us Live
              </Link>
              <a href="mailto:nathanjeichert@gmail.com" className="retro-button bg-transparent border-rust text-rust hover:bg-rust hover:text-midnight flex items-center gap-2">
                <Mail size={16} />
                Contact Us
              </a>
              <a href="https://www.youtube.com/channel/UCOpZMRlcndhoCcN1knIHIHA" target="_blank" rel="noopener noreferrer" className="retro-button bg-transparent border-rust text-rust hover:bg-rust hover:text-midnight flex items-center gap-2">
                <Youtube size={16} />
                YouTube
              </a>
              <a href="https://www.instagram.com/northerndisconnection" target="_blank" rel="noopener noreferrer" className="retro-button bg-transparent border-rust text-rust hover:bg-rust hover:text-midnight flex items-center gap-2">
                <Instagram size={16} />
                Instagram
              </a>
            </div>
          </motion.div>
        </motion.div>

      </section>


      <section className="py-20 px-4 bg-rust/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-bold text-cream">About The Band</h3>
          <p className="text-sand leading-relaxed">
            Evan Pellkofer and Nathan Eichert have been friends and bandmates for more than a decade. Get the full story behind Northern Disconnection's warm, roots-driven sound.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-rust text-rust hover:bg-rust hover:text-midnight transition-colors"
          >
            Learn more
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  )
}
