'use client'

import { motion } from 'framer-motion'
import { Instagram, Youtube, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-midnight/50 backdrop-blur-sm border-t border-rust/30 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-gold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href="https://www.instagram.com/northerndisconnection"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-rust/20 rounded-full text-cream hover:bg-rust/40 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href="https://www.youtube.com/channel/UCOpZMRlcndhoCcN1knIHIHA"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-rust/20 rounded-full text-cream hover:bg-rust/40 transition-colors"
              >
                <Youtube size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                href="mailto:booking@northerndisconnection.com"
                className="p-3 bg-rust/20 rounded-full text-cream hover:bg-rust/40 transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-sand hover:text-cream transition-colors">About</a>
              <a href="/music" className="block text-sand hover:text-cream transition-colors">Music</a>
              <a href="/shows" className="block text-sand hover:text-cream transition-colors">Shows</a>
              <a href="#" className="block text-sand hover:text-cream transition-colors">Press Kit</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gold mb-4">Booking & Press</h3>
            <p className="text-sand mb-2">For booking inquiries:</p>
            <a href="mailto:booking@northerndisconnection.com" className="text-rust hover:text-gold transition-colors">
              booking@northerndisconnection.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rust/30 text-center">
          <p className="text-sand/70">
            © {new Date().getFullYear()} Northern Disconnection. All rights reserved.
          </p>
          <p className="text-sand/50 text-sm mt-2">
            Crafted with love in Sonoma County, CA
          </p>
        </div>
      </div>
    </footer>
  )
}
