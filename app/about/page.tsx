'use client'

import { motion } from 'framer-motion'
import { Guitar, Mic, Heart, Mountain } from 'lucide-react'

export const metadata = {
  title: 'About',
  description: 'Learn more about Two Against Nature - our story, our music, and our journey.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-cream mb-12 vintage-shadow"
        >
          About Two Against Nature
        </motion.h1>

        {/* Band Members Section */}
        <section className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-rust/10 rounded-lg p-8"
          >
            <div className="w-full h-64 bg-sage/20 rounded-lg mb-6 flex items-center justify-center">
              <Guitar size={48} className="text-gold" />
            </div>
            <h3 className="text-2xl font-bold text-gold mb-2">Member One</h3>
            <p className="text-rust mb-4">Guitar, Vocals, Harmonica</p>
            <p className="text-sand">
              With roots deep in Delta blues and a heart that beats to the rhythm of the cosmos, 
              Member One brings the grounding force of tradition to our sonic explorations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-sage/10 rounded-lg p-8"
          >
            <div className="w-full h-64 bg-rust/20 rounded-lg mb-6 flex items-center justify-center">
              <Mic size={48} className="text-gold" />
            </div>
            <h3 className="text-2xl font-bold text-gold mb-2">Member Two</h3>
            <p className="text-sage mb-4">Vocals, Keys, Percussion</p>
            <p className="text-sand">
              A wanderer at heart with a voice that carries the wisdom of ancient hills, 
              Member Two weaves ethereal melodies through our earthbound rhythms.
            </p>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-rust mb-8">Our Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart size={48} className="text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-cream mb-2">Authenticity</h3>
              <p className="text-sand">
                Every note we play comes from a place of truth, 
                unfiltered and raw as the California wilderness.
              </p>
            </div>
            <div className="text-center">
              <Mountain size={48} className="text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-cream mb-2">Connection</h3>
              <p className="text-sand">
                We believe music is the bridge between souls, 
                nature, and the cosmic dance of existence.
              </p>
            </div>
            <div className="text-center">
              <Guitar size={48} className="text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-cream mb-2">Evolution</h3>
              <p className="text-sand">
                While honoring tradition, we push boundaries, 
                exploring new territories of sound and story.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-sage mb-8">Our Journey</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-gold rounded-full mt-1"></div>
              <div>
                <h3 className="text-xl font-bold text-cream">2023 - The Beginning</h3>
                <p className="text-sand">Two musicians meet at a folk festival, discover a shared vision.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-rust rounded-full mt-1"></div>
              <div>
                <h3 className="text-xl font-bold text-cream">2024 - First Recordings</h3>
                <p className="text-sand">Barn sessions turn into our debut tracks, capturing lightning in a bottle.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-sage rounded-full mt-1"></div>
              <div>
                <h3 className="text-xl font-bold text-cream">2025 - The Road Ahead</h3>
                <p className="text-sand">Tours planned, album in the works, the journey continues...</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
} 