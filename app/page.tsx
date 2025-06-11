'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Music, Calendar, ChevronRight, Play } from 'lucide-react'
import ImageCarousel from './components/image-carousel'

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 gradient-psychedelic"></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-2 text-rust tracking-tight transform scale-y-150 origin-center">
            <span className="block" style={{ textShadow: '3px 3px 0px #031b33, 6px 6px 0px rgba(212, 98, 42, 0.3)' }}>TWO AGAINST</span>
          </h1>
          <h2 className="text-6xl md:text-8xl font-black text-rust mb-8 tracking-tight transform scale-y-150 origin-center" style={{ textShadow: '3px 3px 0px #031b33, 6px 6px 0px rgba(212, 98, 42, 0.3)' }}>NATURE</h2>
          
          <div className="flex items-center justify-center space-x-2 text-sand mb-12">
            <MapPin size={20} />
            <span className="text-lg">Sonoma County, California</span>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-xl text-sand max-w-2xl mx-auto leading-relaxed">
              Where the rolling hills meet the Pacific fog, two souls merge americana roots 
              with psychedelic dreams, crafting stories of love, loss, and the eternal dance 
              between humanity and the wild.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/music" className="retro-button">
                Listen Now
              </Link>
              <Link href="/shows" className="retro-button bg-transparent border-rust text-rust hover:bg-rust hover:text-cream">
                See Us Live
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronRight size={32} className="text-gold rotate-90" />
        </motion.div>
      </section>

      {/* Featured Video Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-rust mb-8"
          >
            Latest Performance
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video bg-sage/20 rounded-lg overflow-hidden group cursor-pointer"
          >
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play size={64} className="text-gold mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <p className="text-sand">Video Coming Soon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Band Story Section */}
      <section className="py-20 px-4 bg-rust/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gold mb-6">Our Story</h3>
            <div className="space-y-4 text-sand">
              <p>
                Born from late-night jam sessions in a converted barn studio overlooking 
                the Sonoma vineyards, Two Against Nature emerged as an unlikely fusion 
                of traditional American folk and exploratory psychedelia.
              </p>
              <p>
                We draw inspiration from the misty mornings of Northern California, 
                the stories of travelers and dreamers, and the timeless tension between 
                progress and preservation.
              </p>
              <p>
                Our music is a journey through sun-soaked valleys and moonlit forests, 
                where steel guitars meet synthesizers and harmonies float like coastal fog.
              </p>
            </div>
            <Link href="/about" className="inline-flex items-center text-rust hover:text-gold mt-6 group">
              Read More 
              <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
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

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-4xl font-bold text-cream mb-6">Join Our Journey</h3>
          <p className="text-xl text-sand mb-8">
            Subscribe to our newsletter for exclusive content, tour dates, and stories from the road.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-3 bg-cream/10 border-2 border-rust rounded-lg text-cream placeholder-sand/50 focus:outline-none focus:border-gold"
            />
            <button type="submit" className="retro-button">
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}
