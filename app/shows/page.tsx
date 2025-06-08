'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Ticket, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Shows',
  description: 'Upcoming concerts and events for Two Against Nature.',
}

const upcomingShows = [
  {
    date: 'March 15, 2025',
    time: '8:00 PM',
    venue: 'The Mystic Theatre',
    location: 'Petaluma, CA',
    description: 'An intimate evening of psychedelic americana under the stars.',
    ticketLink: '#',
    soldOut: false,
  },
  {
    date: 'March 22, 2025',
    time: '7:30 PM',
    venue: 'HopMonk Tavern',
    location: 'Sebastopol, CA',
    description: 'Join us for a night of music and local brews in the heart of Sonoma County.',
    ticketLink: '#',
    soldOut: false,
  },
  {
    date: 'April 5, 2025',
    time: '9:00 PM',
    venue: 'The Independent',
    location: 'San Francisco, CA',
    description: 'Our biggest show yet in the city by the bay.',
    ticketLink: '#',
    soldOut: true,
  },
]

export default function ShowsPage() {
  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-cream mb-12 vintage-shadow"
        >
          Upcoming Shows
        </motion.h1>

        <div className="space-y-6">
          {upcomingShows.map((show, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-cream/5 border border-rust/30 rounded-lg p-6 hover:bg-cream/10 transition-colors"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center text-gold mb-2">
                    <Calendar size={20} className="mr-2" />
                    <span className="font-bold">{show.date}</span>
                  </div>
                  <div className="flex items-center text-sand">
                    <Clock size={20} className="mr-2" />
                    <span>{show.time}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-cream mb-1">{show.venue}</h3>
                  <div className="flex items-center text-sand">
                    <MapPin size={20} className="mr-2" />
                    <span>{show.location}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <p className="text-sand text-sm mb-4 md:mb-0">{show.description}</p>
                  {show.soldOut ? (
                    <span className="text-rust font-bold uppercase">Sold Out</span>
                  ) : (
                    <a 
                      href={show.ticketLink}
                      className="inline-flex items-center text-gold hover:text-rust transition-colors group"
                    >
                      <Ticket size={20} className="mr-2" />
                      <span>Get Tickets</span>
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {upcomingShows.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-sand mb-4">No upcoming shows at this time.</p>
            <p className="text-lg text-sand/70">Check back soon for updates!</p>
          </motion.div>
        )}

        {/* Past Shows Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-rust mb-8">Past Adventures</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-sage/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cream mb-2">Sonoma Folk Festival 2024</h3>
              <p className="text-sand">Where it all began - our first public performance together.</p>
            </div>
            <div className="bg-rust/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cream mb-2">Barn Sessions Live 2024</h3>
              <p className="text-sand">An unforgettable night of music under the harvest moon.</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
} 