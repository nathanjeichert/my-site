'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Music, Calendar, ChevronRight, Mail, Youtube, Instagram } from 'lucide-react'
import ImageCarousel from './components/image-carousel'
import Image from 'next/image'

export default function Page() {
  const bandPhotos = [
    '/band-photos/IMG_0650.JPG',
    '/band-photos/IMG_0673.jpg',
    '/band-photos/IMG_3282.jpg',
    '/band-photos/1B1859B0-4F55-4C1D-8DAC-6D3ADA66C94C.jpeg',
    '/band-photos/82560632-D0F3-446C-A801-141D452DDE47.jpeg',
    '/band-photos/AB205CB5-7678-4A20-8679-E164402D7B09_4_5005_c.jpeg',
    '/band-photos/11.jpg.jpeg'
  ];

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


      {/* Band Story Section */}
      <section className="py-20 px-4 bg-rust/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-cream mb-6">About The Band</h3>
            <div className="space-y-4 text-sand">
              <p>
                Evan Pellkofer (guitar) and Nathan Eichert (keys) have been playing music together since elementary school. After a decade-plus, and with a little help from a rotating cast of talented friends, the duo is bringing their blend of blues, folk, jazz, and psychedelic rock to audiences around the San Francisco Bay Area.
              </p>
              <p>
                Northern Disconnection's diverse set lists feature a blend of original songs and their take on the music that formed the soundtrack of their childhood, such as the Grateful Dead, Crosby, Stills, Nash and Young, and Steely Dan.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Band Photo Carousel */}
            <div className="aspect-square rounded-lg overflow-hidden">
              <ImageCarousel images={bandPhotos} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-rust/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
